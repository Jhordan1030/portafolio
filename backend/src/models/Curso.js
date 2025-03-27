module.exports = (sequelize, DataTypes) => {
    const Curso = sequelize.define('Curso', {
        // ... otros campos ...
    }, {
        tableName: 'cursos',
        timestamps: true, // Asegúrate de que esto esté activado
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Curso;
};