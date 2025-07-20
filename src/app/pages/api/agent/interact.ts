import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const { drug1 = "", drug2 = "" } = req.query;

    const drugs = [{
        id: 1, name: String(drug1), effects: ["mide bulantia"],
    }, {
        id: 2, name: String(drug2), effects: ["bas agrisi"],
    }]
    
    const interactions = [
        {pair: [String(drug1), String(drug2)], severity: "medium", desc: " Olumsuz etkilesim riski var."},
    ]
    
    res.status(200).json({drugs, interactions})
}