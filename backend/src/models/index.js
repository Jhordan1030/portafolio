const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        logging: config.logging,
        define: {
            timestamps: true,
            underscored: true,
        },
    }
);

// Función para definir modelos con DataTypes explícitos
const defineModel = (modelDefinition) => {
    return modelDefinition(sequelize, DataTypes);
};

const models = {
    Docente: defineModel(require('./Docente')),
    Curso: defineModel(require('./Curso')),
    DocenteCurso: defineModel(require('./DocenteCurso')),
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = {
    sequelize,
    ...models,
    DataTypes, // Exportamos DataTypes para uso externo
};