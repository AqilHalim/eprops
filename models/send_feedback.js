const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id_feedback: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_feedback"
    },
    id_notice: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_notice",
      references: {
        key: "id_notice",
        model: "notice_model"
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
    tanggalkirim: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggalkirim"
    },
    tanggalproses: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggalproses"
    },
    tanggalselesai: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggalselesai"
    },
    tanggalbaca: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "tanggalbaca"
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
    tableName: "send_feedback",
    timestamps: true,
    updatedAt: false,
    comment: "",
    indexes: [{
      name: "id_notice",
      unique: false,
      type: "BTREE",
      fields: ["id_notice"]
    }, {
      name: "id_people",
      unique: false,
      type: "BTREE",
      fields: ["id_people"]
    }]
  };
  const SendFeedbackModel = sequelize.define("send_feedback_model", attributes, options);
  return SendFeedbackModel;
};