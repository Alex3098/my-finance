'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( {User, CategoryIcon }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'users' })
      this.hasMany(CategoryIcon, { foreignKey: 'iconId', as: 'categoryImages' } )
    }

    toJSON() {
      return { ...this.get(), id: undefined }; // hide id field from json response
    }
  }
  Category.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iconId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};