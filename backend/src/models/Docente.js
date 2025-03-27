module.exports = (sequelize, DataTypes) => {
    const Docente = sequelize.define('Docente', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        // ... otros campos ...
    }, {
        tableName: 'docentes',
    });

    Docente.associate = function(models) {
        this.belongsToMany(models.Curso, {
            through: models.DocenteCurso,
            foreignKey: 'docente_id',
        });
    };

    return Docente;
};