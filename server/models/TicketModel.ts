
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/index';

class TicketModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public subject!: string;
  public problemDescription!: string;
  public status!: 'New' | 'In Progress' | 'Resolved' | 'Spam';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TicketModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    problemDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('New', 'In Progress', 'Resolved', 'Spam'),
      defaultValue: 'New',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Ticket',
  }
);

export default TicketModel;
