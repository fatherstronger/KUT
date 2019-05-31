window.addEventListener('load', init)
let scene
let camera
let renderer
let control
let sceneObjects = []

function init() {
	scene = new THREE.Scene()
	scene.background = new THREE.Color( 0x7EC0EE )

	camera = new THREE.PerspectiveCamera(5.0, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.set(5.0, 2.0, 5.0)

	renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)

	control = new THREE.OrbitControls( camera, renderer.domElement )

	document.body.appendChild(renderer.domElement)
	addGlobeCube()
	animationLoop()
}

function addGlobeCube() {
	let uniforms = {
		  colorB: {type: 'vec3', value: new THREE.Color(0x66CD00)},
		  colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
	  }
  
	let geometry = new THREE.BoxGeometry(1.0, 0.1, 1.0)
	let material =  new THREE.ShaderMaterial({
	  uniforms: uniforms,
	  fragmentShader: FRAGMENT_GLOBE,
	  vertexShader: VERTEX_GLOBE,
	})
  
	let mesh = new THREE.Mesh(geometry, material)
	scene.add(mesh)
	sceneObjects.push(mesh)
  }
  

function animationLoop() {
	renderer.render(scene, camera)
	requestAnimationFrame(animationLoop)
}