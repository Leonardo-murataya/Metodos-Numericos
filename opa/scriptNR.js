document.getElementById('newtonRaphsonForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const xi = parseFloat(document.getElementById('xi').value);
    const equation = document.getElementById('equation').value;
    const tolerance = 0.01;
    let x = xi;
    let error = 1;
    let iteration = 0;
    
    const f = math.compile(equation);
    const fPrime = math.derivative(equation, 'x').compile();
    
    const initialValues = document.getElementById('initialValues');
    const iterationsTableBody = document.getElementById('iterationsTable').getElementsByTagName('tbody')[0];
    
    
    
    while (error > tolerance) {
        const fx = f.evaluate({x: x});
        const fxPrime = fPrime.evaluate({x: x});
        
        const xNew = x - fx / fxPrime;
        error = Math.abs((xNew - x) / xNew) * 100;
        
        iteration++;
        const row = iterationsTableBody.insertRow();
        row.insertCell(0).textContent = iteration;
        row.insertCell(1).textContent = x.toFixed(5);
        row.insertCell(2).textContent = fx.toFixed(5);
        row.insertCell(3).textContent = fxPrime.toFixed(5);
        row.insertCell(4).textContent = xNew.toFixed(5);
        row.insertCell(5).textContent = error.toFixed(2);
        
        x = xNew;
    }
});