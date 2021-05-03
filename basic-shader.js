const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl2');

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// La version siempre tiene que ir en la primer línea.
// in = input
// Se tiene que tener una función main para ejecutar el contenido.
// Position lleva "x" y "y", se le pone 0, 1 por que no hay nada en z w. Es un vec4.
// Presición es que tan amplio es el margen de error de lo que estemos calculando.
const vertexShader = `#version 300 es
    precision mediump float;
    in vec2 position;
    void main()
    {
        gl_Position = vec4(position, 0, 1);
    }
`;
// out traspasa una variable a otro script (Es literalmente la salida de color).
// Un programa de shader necesita el vertex y fragment.
const fragmentShader = `#version 300 es
    precision mediump float;
    out vec4 fragColor;
    void main()
    {
        fragColor = vec4(1, 1, 1, 1);
    }
`;

const vs = gl.createShader(gl.VERTEX_SHADER); //Reserva de memoria donde va ir un Vertex Shader
const fs = gl.createShader(gl.FRAGMENT_SHADER); //Reserva de memoria donde va ir un Fragment Shader.

//Se guarda en el source
gl.shaderSource(vs, vertexShader);
gl.shaderSource(fs, fragmentShader);

///Se compila
gl.compileShader(vs);
gl.compileShader(fs);

//Se tiene que comprobar que todo este bien
if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(vs));
}

if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(fs));
}

//Se genera el proyecto
const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program); //Esta ligando el programa ya con los shader attach

//Se verifica
if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program); //Con esto se indica que ya se puede empezar a usar el Shader.