// Agrega un evento 'submit' al formulario con el id 'trapezoidForm'
document.getElementById('trapezoidForm').addEventListener('submit', function(event) {
    // Previene el envío del formulario y la recarga de la página
    event.preventDefault();
    
    // Obtiene los valores de los campos del formulario
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const equation = document.getElementById('equation').value;
    const n = parseInt(document.getElementById('n').value);
    
    // Compila la ecuación usando math.js
    const f = math.compile(equation);
    // Calcula la altura de los subintervalos
    const h = (b - a) / n;
    
    // Muestra la altura en el elemento con el id 'height'
    document.getElementById('height').textContent = `Altura (h): ${h.toFixed(5)}`;
    
    let sum = 0; // Inicializa la suma para el cálculo de la integral
    // Obtiene el cuerpo de la tabla para mostrar los valores de xi y f(xi)
    const valuesTableBody = document.getElementById('valuesTable').getElementsByTagName('tbody')[0];
    valuesTableBody.innerHTML = ''; // Limpia los resultados anteriores
    
    // Itera sobre los subintervalos desde 0 hasta n
    for (let i = 0; i <= n; i++) {
        // Calcula el valor de xi en el subintervalo i
        const xi = a + i * h;
        // Evalúa la función en xi
        const fxi = f.evaluate({x: xi});
        
        // Si es el primer o último punto, añade fxi a la suma
        // Si es un punto intermedio, añade 2 * fxi a la suma
        if (i === 0 || i === n) {
            sum += fxi;
        } else {
            sum += 2 * fxi;
        }
        
        // Inserta una nueva fila en la tabla con los valores de xi y f(xi)
        const row = valuesTableBody.insertRow();
        row.insertCell(0).textContent = xi.toFixed(5);
        row.insertCell(1).textContent = fxi.toFixed(5);
    }
    
    // Calcula el valor de la integral usando la regla del trapecio
    const I = (h / 2) * sum;
    // Muestra el resultado de la integral en el elemento con el id 'result'
    document.getElementById('result').textContent = `Valor de la integral (I): ≈${I.toFixed(5)}`;
});
