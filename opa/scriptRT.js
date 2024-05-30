document.getElementById('trapezoidForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const equation = document.getElementById('equation').value;
    const n = parseInt(document.getElementById('n').value);
    
    const f = math.compile(equation);
    const h = (b - a) / n;
    
    document.getElementById('height').textContent = `Altura (h): ${h.toFixed(5)}`;
    
    let sum = 0;
    const valuesTableBody = document.getElementById('valuesTable').getElementsByTagName('tbody')[0];
    valuesTableBody.innerHTML = ''; // Clear previous results
    
    for (let i = 0; i <= n; i++) {
        const xi = a + i * h;
        const fxi = f.evaluate({x: xi});
        
        if (i === 0 || i === n) {
            sum += fxi;
        } else {
            sum += 2 * fxi;
        }
        
        const row = valuesTableBody.insertRow();
        row.insertCell(0).textContent = xi.toFixed(5);
        row.insertCell(1).textContent = fxi.toFixed(5);
    }
    
    const I = (h / 2) * sum;
    document.getElementById('result').textContent = `Valor de la integral (I): ≈${I.toFixed(5)}`;
});