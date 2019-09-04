/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('skd_article', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_ip: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		summary: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		cover: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		classify: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		type: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '0'
		},
		number: {
			type: DataTypes.INTEGER(20),
			allowNull: true,
			defaultValue: '0'
		},
		create_time: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		update_time: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		tableName: 'skd_article',
		timestamps: false
	});
};
