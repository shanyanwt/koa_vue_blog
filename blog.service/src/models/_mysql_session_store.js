/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('_mysql_session_store', {
		id: {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true,
			autoIncrement:true
		},
		expires: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		data: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: '_mysql_session_store',
		timestamps: false
	});
};
