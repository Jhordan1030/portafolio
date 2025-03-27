const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a PostgreSQL establecida');

        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            console.log('✅ Modelos sincronizados (ALTER)');
        } else {
            console.log('✅ Modo producción - Usar migraciones');
        }

        app.listen(PORT, () => {
            console.log(`🚀 Servidor en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error de inicialización:', error);
        process.exit(1);
    }
};

initDB();