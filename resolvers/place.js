import algorithms from "../algorithms";
import { storeFS, storeS3File } from '../helpers/filesystem';
import mkdirp from 'mkdirp';
import { GraphQLUpload } from 'apollo-upload-server';
import AWS from 'aws-sdk';

const UPLOAD_DIR = './uploads'
// Ensure upload directory exists
mkdirp.sync(UPLOAD_DIR);

module.exports = {
  Place: {
    id: root => root.id,

    services: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_services(?)", {
        replacements: [id],
        model: models.Service,
        raw: true
      }),

    users: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_users(?)", {
        replacements: [id],
        model: models.Service,
        raw: true
      })
  },

  FileUpload: GraphQLUpload,

  Query: {
    allPlaces: (root, args, { models }) => models.Place.findAll(),

    getPlace: (root, { id }, { models }) =>
      models.Place.findOne({ where: { id } }),

    findPlaces: (root, args, { models }) =>
      models.Place.findAll()
        .then(places => {
          return algorithms.euclidean(args.place, places);
        })
        .catch(error => {
          return [];
        })
  },

  Mutation: {
    createPlace: (root, args, { models }) => models.Place.create(args.place),

    updatePlace: (root, args, { models }) =>
      models.Place.update(args.place, { where: { id: args.id } }).then(() =>
        models.Place.findOne({ where: { id: args.id } })
      ),

    deletePlace: (root, { id }, { models }) =>
      models.Place.destroy({ where: { id } }),

    addService: (root, { serviceId, placeId }, { models }) =>
      models.sequelize
        .query("select add_service(:serviceId, :placeId)", {
          replacements: { serviceId, placeId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        }),

    removeService: (root, { serviceId, placeId }, { models }) =>
      models.sequelize
        .query("select remove_service(:serviceId, :placeId)", {
          replacements: { serviceId, placeId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        }),

    singleUpload: async (obj, { file: { file, placeId } }, { models: { Place } }) => {
      const { stream, filename } = await file;
      const newImage = await storeFS(stream, filename, UPLOAD_DIR);
      let place = await Place.findOne({ where: { id: placeId } });
      place.photos = [{ ...newImage }];
      let updatedPlace = await place.save();
      return {
        id: updatedPlace.dataValues.photos[0].id,
        path: updatedPlace.dataValues.photos[0].path,
        filename: 'hey'
      }
    },
  }
};
