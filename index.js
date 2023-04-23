const {client} = require('./utils/db');
const {TodoRecord} = require("./records/todo.record");

(async () => {

    await client.connect();
    await console.log('Connected to database');

    try {

        //dodawanie nowych rekordów

        /*

            console.log(await TodoRecord.findAll());

            const todo = await new TodoRecord({
            shortDescription: "INC3456795",
            longDescription: "This is a test todo",
            completed: false
            })

            await todo.insert(todo);
            console.log(await TodoRecord.findAll());

         */


        // aktualizowanie nowych rekordów

        /*

            const todo = await TodoRecord.find('64451fe7a74068678591dc77');

            todo.shortDescription = "INC3456795";
            todo.longDescription = "The base is under attack"
            todo.status = true

            await todo.update()

         */


        // wyświetlanie wszystkich rekordów w wersji cursor

        /*

            for await (const todo of await TodoRecord.findAllWithCursor()) {
                console.log(todo);
            }

         */


        // wyświetlanie wszystkich rekordów w wersji findAll

        /*

            console.log(await TodoRecord.findAll());

         */


        // usuwanie rekordów

        /*

            const todo = await TodoRecord.find('64451fe7a74068678591dc77');
            await todo.delete();

        */


    }catch (e) {
        console.log(e);
    }finally {
        await client.close();
    }

})();