import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'helpdesk',
  host: 'localhost',
});

export { sequelize };

sequelize.sync().then(() => {
  console.log('Database synced successfully');
});