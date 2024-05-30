// Agrega un evento 'submit' al formulario con el id 'newtonRaphsonForm'
document.getElementById('newtonRaphsonForm').addEventListener('submit', function(event) {
    // Previene el envío del formulario y la recarga de la página
    event.preventDefault();
    
    // Obtiene los valores de los campos del formulario
    const xi = parseFloat(document.getElementById('xi').value);
    const equation = document.getElementById('equation').value;
    const tolerance = 0.01; // Define la tolerancia para el error
    let x = xi; // Inicializa x con el valor inicial ingresado
    let error = 1; // Inicializa el error
    let iteration = 0; // Inicializa el contador de iteraciones
    
    // Compila la ecuación y su derivada usando math.js
    const f = math.compile(equation);
    const fPrime = math.derivative(equation, 'x').compile();
    
    // Obtiene el elemento para mostrar los valores iniciales y el cuerpo de la tabla de iteraciones
    const initialValues = document.getElementById('initialValues');
    const iterationsTableBody = document.getElementById('iterationsTable').getElementsByTagName('tbody')[0];
    
    // Limpia los resultados anteriores
    iterationsTableBody.innerHTML = '';
    
    // Itera mientras el error sea mayor que la tolerancia
    while (error > tolerance) {
        // Evalúa la función y su derivada en x
        const fx = f.evaluate({x: x});
        const fxPrime = fPrime.evaluate({x: x});
        
        // Calcula el nuevo valor de x
        const xNew = x - fx / fxPrime;
        // Calcula el error relativo porcentual
        error = Math.abs((xNew - x) / xNew) * 100;
        
        // Incrementa el contador de iteraciones
        iteration++;
        // Inserta una nueva fila en la tabla con los valores de la iteración actual
        const row = iterationsTableBody.insertRow();
        row.insertCell(0).textContent = iteration;
        row.insertCell(1).textContent = x.toFixed(5);
        row.insertCell(2).textContent = fx.toFixed(5);
        row.insertCell(3).textContent = fxPrime.toFixed(5);
        row.insertCell(4).textContent = xNew.toFixed(5);
        row.insertCell(5).textContent = error.toFixed(2);
        
        // Actualiza x con el nuevo valor calculado
        x = xNew;
    }
});
