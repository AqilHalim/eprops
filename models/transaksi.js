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
    tglpembelian: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tglpembelian"
    },
    jmlpembayaran: {
      type: DataTypes.INTEGER(30),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "jmlpembayaran"
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status"
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    }
  };
  const options = {
    tableName: "transaksi",
    timestamps: true,
    updatedAt: false,
    comment: "",
    indexes: [{
      name: "id_property",
      unique: false,
      type: "BTREE",
      fields: ["id_property"]
    }]
  };
  const TransaksiModel = sequelize.define("transaksi_model", attributes, options);
  return TransaksiModel;
};