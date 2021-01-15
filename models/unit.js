const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_people: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id_people",
      references: {
        key: "id_people",
        model: "people_model"
      }
    },
    id_property: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "id_property",
      references: {
        key: "id_property",
        model: "property_model"
      }
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updatedAt"
    }
  };
  const options = {
    tableName: "unit",
    comment: "",
    indexes: [{
      name: "id_property",
      unique: false,
      type: "BTREE",
      fields: ["id_property"]
    }]
  };
  const UnitModel = sequelize.define("unit_model", attributes, options);
  return UnitModel;
};