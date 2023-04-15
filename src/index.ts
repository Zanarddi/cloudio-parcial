import express from "express";
import dotenv from "dotenv"
import { AppDataSource } from "./datasource";


dotenv.config()


AppDataSource.initialize().then(async (dataSource) => {
    await dataSource.runMigrations().then(() => {
        console.log("Migration runned");
    }).catch(err => {
        console.error(err);
    })
})



const app = express();
app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`App is listening on port ${process.env.SERVER_PORT}`);
})


app.post("/create", async (req, res) => {

    // setando valores padrão antes de fazer o insert
    let reqEmail = "";
    let reqNome = "";
    let reqTheme = 'D';
    let reqLanguage = 'en';
    let reqMagicCreate = false;

    // tentando atribuir valores do corpo da requisição às variáveis
    // para casos de nova contas (reqEmail único), teremos apenas o campo de email e nome, fazendo com que o restante se mantenha com o padrão estabelecido 
    try {
        reqEmail = req.body.email;
        reqNome = req.body.nome;
    } catch (error) {
        res.send(400).send('Bad request');
    }
    try { reqNome = req.body.nome; } catch (error) { }
    try { reqTheme = req.body.theme; } catch (error) { }
    try { reqLanguage = req.body.language; } catch (error) { }
    try { reqMagicCreate = req.body.magic_create; } catch (error) { }

    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into("user")
        .values({
            email: `${reqEmail}`,
            nome: `${reqNome}`,
            theme: `${reqTheme}`,
            language: `${reqLanguage}`,
            magic_create: (reqMagicCreate) ? true : false
            // created_at: null,
            // updated_at: null
        }
        )
        .orUpdate(
            ["nome", "theme", "language", "magic_create"],
            ["email"]
        )
        .execute()
        .then((result) => {
            // retornar 
            console.log(result);
            res.status(200).send({
                email: `${reqEmail}`,
                nome: `${reqNome}`,
                theme: `${reqTheme}`,
                language: `${reqLanguage}`,
                magic_create: (reqMagicCreate) ? true : false
            });
        }).catch((err) => {
            res.status(500).send('Erro interno');
            console.error(err);
        });
    res.send("Testing your /create")
})


app.get("/list", async (req, res) => {

    await AppDataSource
    .createQueryBuilder()
    .select("*")
    .from("user", "u")
    .getMany()
    .then((result) => {
        console.log(result);
        res.status(200).send(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Erro interno');
    });
})

app.get("/list/:email", async (req, res) => {

    let userEmail = req.params.email;
    console.log(userEmail);

    await AppDataSource
        .createQueryBuilder()
        .select("*")
        .from("user", "u")
        .where("u.email = :email", { userEmail })
        .getOne()
        .then((result) => {
            console.log(result);
            res.status(200).send(result);
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Erro interno');
        });

    res.send('You tried to access: ' + req.url)
})

app.get('*', function (req, res) {
    res.send('You tried to access: ' + req.url);
});