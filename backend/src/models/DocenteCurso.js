module.exports = (sequelize, DataTypes) => {
    const DocenteCurso = sequelize.define('DocenteCurso', {
        docente_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'docentes',
                key: 'id',
            },
        },
        curso_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'cursos',
                key: 'id',
            },
        },
    }, {
        tableName: 'docente_cursos',
        timestamps: false,
    });

    return DocenteCurso;
};