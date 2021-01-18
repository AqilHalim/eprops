const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_noticeboard: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_noticeboard"
    },
    id_message: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_message",
      references: {
        key: "id_message",
        model: "message_model"
      }
    },
    id_people: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_people",
      references: {
        key: "id_people",
        model: "people_model"
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
    }
  };
  const options = {
    tableName: "noticeboard",
    timestamps: true,
    updatedAt: false,
    comment: "",
    indexes: [{
      name: "id_noticeboard",
      unique: false,
      type: "BTREE",
      fields: ["id_message"]
    }, {
      name: "noticeboard_ibfk_2",
      unique: false,
      type: "BTREE",
      fields: ["id_people"]
    }]
  };
  const NoticeboardModel = sequelize.define("noticeboard_model", attributes, options);
  return NoticeboardModel;
};