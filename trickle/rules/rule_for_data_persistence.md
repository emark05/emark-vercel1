Cuando se actualiza el código del marketplace
- Los productos agregados por usuarios deben persistir en la base de datos
- Los datos de usuarios registrados no deben perderse
- Usar trickleCreateObject y trickleListObjects para mantener datos entre actualizaciones
- Cargar datos de la base de datos al inicializar la aplicación
- Siempre combinar datos mock con datos reales de la base de datos
