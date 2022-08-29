import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "winddata",
})
export class WindData extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: Number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  district!: Number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0,
  })
  speed!: Number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sourceDirection!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  destinationDirection!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  latitude!: Number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  longitude!: Number;
}
