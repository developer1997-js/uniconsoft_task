CREATE DATABASE Unicon_task;

CREATE TABLE users (
	id VARCHAR (50) NOT NULL UNIQUE,
	name VARCHAR ( 50 ) NOT NULL unique,
	role VARCHAR ( 50 ) NOT NULL,
	created_by VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE organizations (
    id VARCHAR (50) NOT NULL UNIQUE,
    title VARCHAR (50) NOT NULL,
    created_by VARCHAR (50) NOT NULL,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE organization_users (
    id VARCHAR (50) NOT NULL UNIQUE,
    org_id VARCHAR (50) NOT NULL,
    user_id VARCHAR (50) NOT NULL,
    created_by VARCHAR (50) NOT NULL,
    CONSTRAINT fk_org_id FOREIGN KEY (org_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
);


CREATE TABLE projects (
    id VARCHAR (50) NOT NULL UNIQUE,
    title VARCHAR (50) NOT NULL,
    org_id VARCHAR (50) NOT NULL,
    created_by VARCHAR (50) NOT NULL,
    CONSTRAINT fk_org_id FOREIGN KEY (org_id)
        REFERENCES organizations(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE TABLE tasks (
    id VARCHAR (50) NOT NULL UNIQUE,
    created_at VARCHAR (50) NOT NULL,
    project_id VARCHAR (50) NOT NULL,
    due_date VARCHAR (50) NOT NULL,
    created_by VARCHAR (50) NOT NULL,
    worker_user_id VARCHAR (50) NOT NULL,
    status VARCHAR (50) NOT NULL,
    done_at VARCHAR (50) NOT NULL,
    CONSTRAINT fk_project_id FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_created_by FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_worker_user_id FOREIGN KEY (worker_user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);


INSERT INTO users (id, name, role, created_by)
VALUES ('af7c1fe6-d669-414e-b066-e9733f0de7a8', 'Anvar', 'admin', '');