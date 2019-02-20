import Datastore from 'nedb'
import path from 'path'
const fsPromises = require('fs').promises
const db = {}


const filePaths = {
    dbPath: path.join(nw.App.dataPath, 'remotes.db'),
    settingsFile: path.join(nw.App.dataPath, 'settings.json')
}

db.remotes = new Datastore({
    filename: filePaths.dbPath,
    autoload: true,
    onload: err => {
        if (err) {
            console.error('Error while loading database.', err)
        }

        db.remotes.find({}, (err, response) => {
            storeDef.state.remoteList = response
        })
    },
    timestampData: true
})

export const storeDef = {
    state: {
        remoteList: [],
        settings: {
          interval: 10,
          notifications: false,
          sounds: false
        }
    },
    getters: {
        allRemotes: state => {
            return state.remoteList;
        },
        remote: (state, getters) => id => {
            return state.remoteList.find(({ _id }) => _id === id);
        },
        settings: state => state.settings
    },
    actions: {
        storeRemote({ commit }, remote) {
            return new Promise((resolve, reject) => {
                let callback = (err, newRemote, updatedRemote) => {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }

                    const remoteToBeSaved = updatedRemote ? updatedRemote : newRemote
                    commit('saveRemote', remoteToBeSaved)

                    resolve()
                }

                remote.uri = !remote.uri.startsWith("https://") ?
                    `http://${remote.uri}` :
                    remote.uri;

                if (remote._id) {
                    db.remotes.update({ _id: remote._id }, remote, { returnUpdatedDocs: true }, callback)
                } else {
                    db.remotes.insert(remote, callback)
                }
            });
        },
        removeRemote({ commit }, id) {
            return new Promise((resolve, reject) => {
                db.remotes.remove({ _id: id }, {}, (err, numRemoved) => {
                    if (err) {
                        console.error(err)
                        reject(err)
                    }
                    commit('deleteRemote', id)
                    resolve()
                })
            });
        },
        storeSettings({ commit }, settings){
        	return fsPromises.writeFile(filePaths.settingsFile, settings)
        	.then(() => {
        		commit('updateSettings', settings)
        	})
        },
        loadSettings({commit}) {
        	return fsPromises.readFile(filePaths.settingsFile)
        	.then(data => {
        		let settings = typeof data !== 'undefined' 
                ? JSON.parse(data.toString()) 
                : state.settings
        		commit('updateSettings', settings)
        	})
        }
    },
    mutations: {
        saveRemote: (state, remote) => {
            let index = state.remoteList.findIndex(({ _id }) => _id === id);



            if (index >= 0) {
                //state.remoteList[index] = remote;
                state.remoteList.splice(index, 1, remote)
            } else {
                remote._id = Date.now();
                state.remoteList.unshift(remote);
            }
        },
        deleteRemote: (state, id) => {
            let index = state.remoteList.findIndex(({ _id }) => _id === id);
            state.remoteList.splice(index, 1);
        },
        editRemote: (state, id) => {},
        updateSettings: (state, settings) => {
        	state.settings = settings
        }
    }
};