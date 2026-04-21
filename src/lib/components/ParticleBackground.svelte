<script>
    import { onMount } from 'svelte';

    let container;

    onMount(async () => {
        // Dynamically import Three.js
        const THREE = await import('three');

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        let renderer;
        try {
            const canvas = document.createElement('canvas');
            const context =
                canvas.getContext('webgl2', { alpha: true, antialias: true }) ||
                canvas.getContext('webgl', { alpha: true, antialias: true }) ||
                canvas.getContext('experimental-webgl', { alpha: true, antialias: true });

            if (!context) {
                return;
            }

            renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
            container.appendChild(renderer.domElement);
        } catch (e) {
            return; // Gracefully exit without rendering
        }

        // Settings
        const particleCount = window.innerWidth < 768 ? 40 : 120; // scale down for mobile
        const maxDistance = 120;
        
        // Geometry for Particles
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * window.innerWidth;
            positions[i * 3 + 1] = (Math.random() - 0.5) * window.innerHeight;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 400; // Depth depth
            
            velocities.push({
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Material for Particles
        const material = new THREE.PointsMaterial({
            color: 0x00d4ff, // Cyan
            size: 2,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Lines Geometry
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.15
        });

        // Pre-allocate buffer for lines (N * N-1 / 2) - we'll just allocate a large enough buffer and update draw range
        const maxLines = particleCount * particleCount;
        const linePositions = new Float32Array(maxLines * 6); // 2 vertices per line, 3 coords per vertex
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(linesMesh);

        camera.position.z = 400;

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const onMouseMove = (event) => {
            mouseX = (event.clientX - window.innerWidth / 2);
            mouseY = (event.clientY - window.innerHeight / 2);
        };

        window.addEventListener('mousemove', onMouseMove);

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onWindowResize);

        // Animation Loop
        let animId;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            targetX = mouseX * 0.05;
            targetY = mouseY * 0.05;
            
            // Subtly move camera based on mouse
            camera.position.x += (targetX - camera.position.x) * 0.02;
            camera.position.y += (-targetY - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            const positions = particles.geometry.attributes.position.array;
            let lineIndex = 0;

            // Move particles
            for (let i = 0; i < particleCount; i++) {
                // Update position
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;

                // Bounce off boundaries
                if (Math.abs(positions[i * 3]) > window.innerWidth / 1.5) velocities[i].x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > window.innerHeight / 1.5) velocities[i].y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 300) velocities[i].z *= -1;

                // Connect close particles with lines
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < maxDistance * maxDistance) {
                        linePositions[lineIndex++] = positions[i * 3];
                        linePositions[lineIndex++] = positions[i * 3 + 1];
                        linePositions[lineIndex++] = positions[i * 3 + 2];
                        
                        linePositions[lineIndex++] = positions[j * 3];
                        linePositions[lineIndex++] = positions[j * 3 + 1];
                        linePositions[lineIndex++] = positions[j * 3 + 2];
                    }
                }
            }

            particles.geometry.attributes.position.needsUpdate = true;
            linesMesh.geometry.attributes.position.needsUpdate = true;
            linesMesh.geometry.setDrawRange(0, lineIndex / 3); // 3 coords per vertex

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(animId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            lineGeometry.dispose();
            lineMaterial.dispose();
            if (container) container.removeChild(renderer.domElement);
        };
    });
</script>

<div bind:this={container} class="particle-bg" aria-hidden="true"></div>

<style>
    .particle-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        pointer-events: none; /* allows clicks to pass through to sections below */
        opacity: 0;
        animation: fadeBgIn 2s ease-in-out 1s forwards;
    }

    /* Fade in smoothly after boot */
    @keyframes fadeBgIn {
        to { opacity: 0.8; }
    }
</style>
