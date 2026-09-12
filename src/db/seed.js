const bcrypt = require('bcrypt');
const pool = require('../config/db');

const roles = ['admin', 'agent', 'client'];
const permissions = [
    ['create_property', 'Create properties'],
    ['update_property', 'Update properties'],
    ['delete_property', 'Delete properties'],
    ['manage_users', 'Manage users and roles'],
    ['manage_categories', 'Manage property categories'],
    ['view_analytics', 'View agent analytics']
];
const rolePermissions = {
    admin: permissions.map(([name]) => name),
    agent: ['create_property', 'update_property', 'delete_property', 'view_analytics'],
    client: []
};
const categories = ['Apartment', 'Villa', 'Land', 'Office'];
const users = [
    { name: 'Admin User', email: 'admin@realestate.com', password: 'Admin123456', role: 'admin' },
    { name: 'Agent User', email: 'agent@realestate.com', password: 'Agent123456', role: 'agent' }
];

async function verifySchema(client) {
    const result = await client.query(
        `SELECT table_name
         FROM information_schema.tables
         WHERE table_schema = 'public'
         AND table_name = ANY($1::text[])`,
        [['roles', 'users', 'permissions', 'role_permissions', 'categories']]
    );
    const existingTables = new Set(result.rows.map((row) => row.table_name));
    const missingTables = ['roles', 'users', 'permissions', 'role_permissions', 'categories']
        .filter((tableName) => !existingTables.has(tableName));

    if (missingTables.length > 0) {
        throw new Error(`Missing required tables: ${missingTables.join(', ')}. Apply src/db/schema.sql before seeding.`);
    }
}

async function seedDatabase() {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await verifySchema(client);

        for (const roleName of roles) {
            await client.query(
                'INSERT INTO roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING',
                [roleName]
            );
        }

        for (const [permissionName, description] of permissions) {
            await client.query(
                `INSERT INTO permissions (name, description)
                 VALUES ($1, $2)
                 ON CONFLICT (name) DO NOTHING`,
                [permissionName, description]
            );
        }

        for (const [roleName, permissionNames] of Object.entries(rolePermissions)) {
            for (const permissionName of permissionNames) {
                await client.query(
                    `INSERT INTO role_permissions (role_id, permission_id)
                     SELECT roles.id, permissions.id
                     FROM roles
                     JOIN permissions ON permissions.name = $2
                     WHERE roles.name = $1
                     ON CONFLICT (role_id, permission_id) DO NOTHING`,
                    [roleName, permissionName]
                );
            }
        }

        for (const categoryName of categories) {
            await client.query(
                `INSERT INTO categories (name)
                 SELECT $1
                 WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = $2)`,
                [categoryName, categoryName]
            );
        }

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await client.query(
                `INSERT INTO users (name, email, password, role_id)
                 SELECT $1, $2, $3, roles.id
                 FROM roles
                 WHERE roles.name = $4
                 ON CONFLICT (email) DO NOTHING`,
                [user.name, user.email, hashedPassword, user.role]
            );
        }

        await client.query('COMMIT');
        console.log('Database seed completed successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

seedDatabase()
    .catch((error) => {
        console.error('Database seed failed:', error.message);
        process.exitCode = 1;
    })
    .finally(() => pool.end());