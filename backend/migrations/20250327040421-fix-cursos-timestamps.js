module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cursos', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: true // Primero permite null
    });

    // Actualiza los registros existentes
    await queryInterface.sequelize.query(`
      UPDATE cursos SET updated_at = NOW()
    `);

    // Ahora haz que la columna sea NOT NULL
    await queryInterface.changeColumn('cursos', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cursos', 'updated_at');
  }
};