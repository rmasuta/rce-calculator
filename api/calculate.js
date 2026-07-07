export default function handler(req, res) {
  if (req.method === 'POST') {
    const { contractPrice, parPrice, actualRCE, commodity, term } = req.body;
    
    const ppr = contractPrice - parPrice;
    const rceWeighted = actualRCE * (term / 60);
    
    let dwp;
    if (commodity === '1') {
      dwp = ppr > 0 ? 1 + ppr * 100 : 1 + ppr * 80;
    } else {
      dwp = ppr > 0 ? 1 + ppr * 10 : 1 + ppr * 8;
    }
    
    const rceDoubleWeighted = rceWeighted * dwp;
    
    res.status(200).json({
      actualRCE,
      rceWeighted: rceWeighted.toFixed(6),
      rceDoubleWeighted: rceDoubleWeighted.toFixed(2)
    });
  }
}
