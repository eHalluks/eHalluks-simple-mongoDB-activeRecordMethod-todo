const {ObjectId} = require("mongodb");
const {todos} = require("../utils/db");

class TodoRecord {
    constructor(obj) {
        this._id = new ObjectId(obj._id);
        this.shortDescription = obj.shortDescription;
        this.longDescription = obj.longDescription;
        this.status = obj.status;
        this._validate()
    }

    _validate() {
        if (!this.shortDescription || !this.longDescription ) {
            throw new Error('The descriptions are required')
        } else if (this.shortDescription.trim() < 3 || this.shortDescription.trim() > 30) {
            throw new Error('The short description must be between 3 and 30 characters long')
        } else if (this.longDescription.trim() > 300) {
            throw new Error('The long description must be less than 300 characters long')
        }
    }

    static async findAll() {
        return (await todos.find({}).toArray()).map(obj => new TodoRecord(obj));
    }

    static async find(id) {
        const item = await todos.findOne({_id: new ObjectId(String(id))});
        return item === null ? null : new TodoRecord(item);
    }

    static async findAllWithCursor() {
        return /* await */ todos.find().toArray();
    }

    async insert() {
        const {insertedId} = await todos.insertOne({
            shortDescription: String(this.shortDescription),
            longDescription: String(this.longDescription),
            status: Boolean(this.status)
        });
        this._id = insertedId;
        return insertedId;
    }

    async update() {

        await todos.replaceOne(
            {_id: this._id},
            {
                shortDescription: String(this.shortDescription),
                longDescription: String(this.longDescription),
                status: Boolean(this.status)
            }
        );
    }

    async delete() {
        await todos.deleteOne({_id: this._id});
    }
}

module.exports = {TodoRecord};
