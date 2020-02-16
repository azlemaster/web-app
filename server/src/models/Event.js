module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    owner: DataTypes.STRING,
    genre: DataTypes.STRING,
    date: DataTypes.DATE,
    city: DataTypes.STRING,
    eventImageUrl: DataTypes.STRING,
    payLink: DataTypes.STRING,
    description: DataTypes.TEXT
  })

  Event.associate = function (models) {
  }

  return Event
}
