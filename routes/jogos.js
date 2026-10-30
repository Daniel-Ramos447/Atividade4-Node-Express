
const express = require("express");
const router = express.Router();

let jogos = [
    {
        id: 1,
        titulo: "Minecraft",
        plataforma: "PC",
        genero: "Aventura",
        anoLancamento: 2011
    },
    {
        id: 2,
        titulo: "Final Fantasy",
        plataforma: "PC",
        genero: "Fantasia",
        anoLancamento: 1987
    }
];

router.get("/", (req, res) => {
    res.status(200).json(jogos);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const jogo = jogos.find(jogo => jogo.id === id);

    if (!jogo) {
        return res.status(404).json({
            erro: "Jogo não encontrado."
        });
    }

    res.status(200).json(jogo);
});

router.post("/", (req, res) => {
    const dados = req.body || {};

    if (
        !dados.titulo ||
        !dados.plataforma ||
        !dados.genero ||
        dados.anoLancamento === undefined ||
        dados.anoLancamento === null ||
        dados.anoLancamento === ""
    ) {
        return res.status(400).json({
            erro: "Todos os campos do jogo são obrigatórios."
        });
    }

    const novoJogo = {
        id: jogos.length > 0
            ? Math.max(...jogos.map(jogo => jogo.id)) + 1
            : 1,
        titulo: dados.titulo,
        plataforma: dados.plataforma,
        genero: dados.genero,
        anoLancamento: dados.anoLancamento
    };

    jogos.push(novoJogo);

    res.status(201).json(novoJogo);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const jogo = jogos.find(jogo => jogo.id === id);

    if (!jogo) {
        return res.status(404).json({
            erro: "Jogo não encontrado."
        });
    }

    jogo.titulo = req.body.titulo;
    jogo.plataforma = req.body.plataforma;
    jogo.genero = req.body.genero;
    jogo.anoLancamento = req.body.anoLancamento;

    res.status(200).json(jogo);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const indice = jogos.findIndex(jogo => jogo.id === id);

    if (indice === -1) {
        return res.status(404).json({
            erro: "Jogo não encontrado."
        });
    }

    const jogoRemovido = jogos.splice(indice, 1)[0];

    res.status(200).json(jogoRemovido);
});

module.exports = router;
