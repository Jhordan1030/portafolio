-- Crear extensión para UUIDs (opcional pero útil)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de docentes (usuarios)
CREATE TABLE docentes (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          username VARCHAR(50) UNIQUE NOT NULL,
                          password_hash VARCHAR(100) NOT NULL,
                          nombre_completo VARCHAR(100) NOT NULL,
                          email VARCHAR(100) UNIQUE,
                          especialidad VARCHAR(100),
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de cursos
CREATE TABLE cursos (
                        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                        nombre VARCHAR(100) NOT NULL,
                        codigo VARCHAR(20) UNIQUE NOT NULL,
                        horario VARCHAR(50),
                        salon VARCHAR(20),
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relación muchos-a-muchos entre docentes y cursos
CREATE TABLE docente_cursos (
                                docente_id UUID REFERENCES docentes(id) ON DELETE CASCADE,
                                curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
                                PRIMARY KEY (docente_id, curso_id)
);

-- Tabla de estudiantes
CREATE TABLE estudiantes (
                             id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                             codigo VARCHAR(20) UNIQUE NOT NULL,
                             nombre_completo VARCHAR(100) NOT NULL,
                             email VARCHAR(100),
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relación estudiantes-cursos (muchos-a-muchos)
CREATE TABLE estudiante_cursos (
                                   estudiante_id UUID REFERENCES estudiantes(id) ON DELETE CASCADE,
                                   curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
                                   PRIMARY KEY (estudiante_id, curso_id)
);

-- Tabla de trabajos/entregas
CREATE TABLE trabajos (
                          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                          titulo VARCHAR(100) NOT NULL,
                          descripcion TEXT,
                          fecha_entrega DATE NOT NULL,
                          fecha_limite DATE NOT NULL,
                          curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de calificaciones
CREATE TABLE calificaciones (
                                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                                trabajo_id UUID REFERENCES trabajos(id) ON DELETE CASCADE,
                                estudiante_id UUID REFERENCES estudiantes(id) ON DELETE CASCADE,
                                docente_id UUID REFERENCES docentes(id) ON DELETE SET NULL,
                                puntuacion DECIMAL(5,2) CHECK (puntuacion >= 0 AND puntuacion <= 10),
                                retroalimentacion TEXT,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                UNIQUE (trabajo_id, estudiante_id)
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_docente_username ON docentes(username);
CREATE INDEX idx_curso_codigo ON cursos(codigo);
CREATE INDEX idx_estudiante_codigo ON estudiantes(codigo);