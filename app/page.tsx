

'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import confetti from 'canvas-confetti'

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [yearsLeft, setYearsLeft] = useState(135)

  // Health Metrics
  const [fastingGlucose, setFastingGlucose] = useState(100)
  const [triglycerides, setTriglycerides] = useState(150)
  const [hdl, setHdl] = useState(50)
  const [bloodPressure, setBloodPressure] = useState(120)
  const [hsCRP, setHsCRP] = useState(1)
  const [hemoglobinA1c, setHemoglobinA1c] = useState(5.5)
  const [uricAcid, setUricAcid] = useState(5)
  const [vitaminD, setVitaminD] = useState(30) 
  const [restingHeartRate, setRestingHeartRate] = useState(60)

  // Lifestyle Metrics
  const [sleepHours, setSleepHours] = useState(8)
  const [stressLevel, setStressLevel] = useState(5)
  const [exerciseMinutes, setExerciseMinutes] = useState(30)
  const [organicFoodPercentage, setOrganicFoodPercentage] = useState(50)
  const [processedFoodAvoidance, setProcessedFoodAvoidance] = useState(5)
  const [sugarIntake, setSugarIntake] = useState(25)
  const [vegetableServings, setVegetableServings] = useState(5)
  const [steps, setSteps] = useState(7000)
  const [weightLiftingDays, setWeightLiftingDays] = useState(2)
  const [outdoorTimeMinutes, setOutdoorTimeMinutes] = useState(30)

  // Light and Sleep
  const [wakeWithinOneHour, setWakeWithinOneHour] = useState(1)
  const [fallAsleepEasily, setFallAsleepEasily] = useState(1)
  const [stayAsleepThroughNight, setStayAsleepThroughNight] = useState(1)
  const [useRedLights, setUseRedLights] = useState(1)
  const [useDimmers, setUseDimmers] = useState(1)
  const [useNightMode, setUseNightMode] = useState(1)

  // Meal Timing and Habits
  const [fastFourteenHours, setFastFourteenHours] = useState(1)
  const [consistentMealTimes, setConsistentMealTimes] = useState(1)
  const [mindfulEating, setMindfulEating] = useState(1)
  const [gratitudeBeforeEating, setGratitudeBeforeEating] = useState(1)
  const [eatSlowly, setEatSlowly] = useState(1)
  const [sitWhileEating, setSitWhileEating] = useState(1)
  const [noPhoneWhileEating, setNoPhoneWhileEating] = useState(1)

  // Mind-Body
  const [practicesMindfulness, setPracticesMindfulness] = useState(1)
  const [workedWithTherapist, setWorkedWithTherapist] = useState(1)
  const [confidenceInBodyMindConnection, setConfidenceInBodyMindConnection] = useState(1)
  const [hasTrustedPerson, setHasTrustedPerson] = useState(1)
  const [expressFeelingsOpenly, setExpressFeelingsOpenly] = useState(1)
  const [hasStressStrategies, setHasStressStrategies] = useState(1)
  const [groundsRegularly, setGroundsRegularly] = useState(1)
  const [focusesOnGratitude, setFocusesOnGratitude] = useState(1)

  // Toxins
  const [filtersWater, setFiltersWater] = useState(1)
  const [checksWaterQuality, setChecksWaterQuality] = useState(1)
  const [drinksEnoughWater, setDrinksEnoughWater] = useState(1)
  const [avoidsPlasticBottles, setAvoidsPlasticBottles] = useState(1)
  const [avoidsArtificialFlavors, setAvoidsArtificialFlavors] = useState(1)
  const [limitedAlcoholIntake, setLimitedAlcoholIntake] = useState(1)

  const [showEstimatedLifespan, setShowEstimatedLifespan] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Set up the scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000) // Black background

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.enableZoom = false

    // Create a group to hold all objects
    const group = new THREE.Group()
    scene.add(group)

    // Create DNA helix
    const createDNAHelix = () => {
      const dnaGroup = new THREE.Group()
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2, -2, 0),
        new THREE.Vector3(-1, -1, 1),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(2, 2, 0)
      ])

      const points = curve.getPoints(200)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0xffffff })
      const curveObject = new THREE.Line(geometry, material)
      dnaGroup.add(curveObject)

      const sphereGeometry = new THREE.SphereGeometry(0.05, 8, 8)
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

      for (let i = 0; i < points.length; i += 10) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.copy(points[i])
        dnaGroup.add(sphere)

        if (i % 20 === 0) {
          const connector = new THREE.Mesh(
            new THREE.CylinderGeometry(0.01, 0.01, 0.5, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
          )
          connector.position.copy(points[i])
          connector.lookAt(points[i + 1] || points[i - 1])
          connector.rotateX(Math.PI / 2)
          dnaGroup.add(connector)
        }
      }

      return dnaGroup
    }

    // Create molecules
    const createMolecule = (position: THREE.Vector3) => {
      const moleculeGroup = new THREE.Group()
      const atomGeometry = new THREE.SphereGeometry(0.1, 16, 16)
      const atomMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

      const centralAtom = new THREE.Mesh(atomGeometry, atomMaterial)
      moleculeGroup.add(centralAtom)

      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2
        const radius = 0.3
        const atom = new THREE.Mesh(atomGeometry, atomMaterial)
        atom.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        )
        moleculeGroup.add(atom)

        const bondGeometry = new THREE.CylinderGeometry(0.01, 0.01, radius, 8)
        const bondMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        const bond = new THREE.Mesh(bondGeometry, bondMaterial)
        bond.position.copy(atom.position).multiplyScalar(0.5)
        bond.lookAt(new THREE.Vector3(0, 0, 0))
        bond.rotateX(Math.PI / 2)
        moleculeGroup.add(bond)
      }

      moleculeGroup.position.copy(position)
      return moleculeGroup
    }

    // Add DNA helices
    const dnaHelix1 = createDNAHelix()
    dnaHelix1.rotation.z = Math.PI / 4
    group.add(dnaHelix1)

    const dnaHelix2 = createDNAHelix()
    dnaHelix2.rotation.z = -Math.PI / 4
    dnaHelix2.rotation.x = Math.PI / 2
    group.add(dnaHelix2)

    // Add molecules
    for (let i = 0; i < 10; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 2 + Math.random() * 2
      const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
      const molecule = createMolecule(position)
      group.add(molecule)
    }

    // Animation variables
    let currentZoom = 10
    const targetZoom = 5
    const zoomDuration = 2000
    const startTime = Date.now()

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)

      // Rotate the entire group
      group.rotation.y += 0.002

      // Animate zoom
      const elapsedTime = Date.now() - startTime
      if (elapsedTime < zoomDuration) {
        const progress = elapsedTime / zoomDuration
        currentZoom = 10 - (10 - targetZoom) * easeOutCubic(progress)
        camera.position.z = currentZoom
      }

      controls.update()
      renderer.render(scene, camera)
    }

    // Easing function for smooth animation
    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3)
    }

    // Start the animation loop
    animate()

    // Handle window resizing
    const handleResize = () => {
      if (!mountRef.current) return
      const width = mountRef.current.clientWidth
      const height = mountRef.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleResize)

    // Handle cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  const calculateLongevity = () => {
    let baseLifespan = 79; // Average global life expectancy
    let adjustedLifespan = baseLifespan;

    // Health Metrics Impact
    if (fastingGlucose < 100) adjustedLifespan += 2;
    else if (fastingGlucose > 126) adjustedLifespan -= 5;

    if (triglycerides < 150) adjustedLifespan += 2;
    else if (triglycerides > 200) adjustedLifespan -= 3;

    if (hdl > 60) adjustedLifespan += 3;
    else if (hdl < 40) adjustedLifespan -= 3;

    if (bloodPressure < 120) adjustedLifespan += 3;
    else if (bloodPressure > 140) adjustedLifespan -= 5;

    if (hsCRP < 1) adjustedLifespan += 2;
    else if (hsCRP > 3) adjustedLifespan -= 3;

    if (hemoglobinA1c < 5.7) adjustedLifespan += 3;
    else if (hemoglobinA1c > 6.5) adjustedLifespan -= 5;

    if (uricAcid < 6) adjustedLifespan += 1;
    else if (uricAcid > 7) adjustedLifespan -= 2;

    if (vitaminD > 30) adjustedLifespan += 2;
    else if (vitaminD < 20) adjustedLifespan -= 2;

    if (restingHeartRate < 70) adjustedLifespan += 2;
    else if (restingHeartRate > 80) adjustedLifespan -= 2;

    // Lifestyle Metrics Impact
    adjustedLifespan += Math.min(3, (sleepHours - 6) * 0.5);
    adjustedLifespan -= Math.max(0, stressLevel - 5) * 0.5;
    adjustedLifespan += Math.min(5, exerciseMinutes / 30);
    adjustedLifespan += Math.min(3, organicFoodPercentage / 33);
    adjustedLifespan += Math.min(2, processedFoodAvoidance * 0.2);
    adjustedLifespan -= Math.max(0, (sugarIntake - 25) / 10);
    adjustedLifespan += Math.min(3, vegetableServings * 0.5);
    adjustedLifespan += Math.min(3, (steps - 5000) / 2000);
    adjustedLifespan += Math.min(2, weightLiftingDays * 0.5);
    adjustedLifespan += Math.min(2, outdoorTimeMinutes / 60);

    // Light and Sleep Impact
    const lightSleepScore = wakeWithinOneHour + fallAsleepEasily + stayAsleepThroughNight + 
                            useRedLights + useDimmers + useNightMode;
    adjustedLifespan += lightSleepScore * 0.3;

    // Meal Timing and Habits Impact
    const mealHabitsScore = fastFourteenHours + consistentMealTimes + mindfulEating + 
                            gratitudeBeforeEating + eatSlowly + sitWhileEating + noPhoneWhileEating;
    adjustedLifespan += mealHabitsScore * 0.2;

    // Mind-Body Impact
    const mindBodyScore = practicesMindfulness + workedWithTherapist + confidenceInBodyMindConnection + 
                          hasTrustedPerson + expressFeelingsOpenly + hasStressStrategies + 
                          groundsRegularly + focusesOnGratitude;
    adjustedLifespan += mindBodyScore * 0.3;

    // Toxins Impact
    const toxinAvoidanceScore = filtersWater + checksWaterQuality + drinksEnoughWater + 
                                avoidsPlasticBottles + avoidsArtificialFlavors + limitedAlcoholIntake;
    adjustedLifespan += toxinAvoidanceScore * 0.3;

    // Cap the maximum lifespan at 135 years
    const finalLifespan = Math.min(135, Math.max(40, Math.round(adjustedLifespan)));

    setYearsLeft(finalLifespan);
    setShowEstimatedLifespan(true);

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <style jsx global>{`
        ::selection {
          background-color: white;
          color: black;
        }
        html {
          scroll-behavior: smooth;
        }
        .cta-button {
          color: black;
          background-color: white;
          border: 2px solid white;
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          color: white;
          background-color: black;
          border-color: white;
        }
      `}</style>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-white via-transparent to-black opacity-30 pointer-events-none"></div>
      <nav className="sticky top-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-white text-xl font-bold">age135</span>
            </div>
            <a 
              href="https://twitter.com/aaronsiim" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <span className="text-2xl">𝕏</span>
            </a>
          </div>
        </div>
      </nav>
      <div 
        ref={mountRef} 
        className="w-full h-[40vh]"
      />
      <div className="flex justify-center items-end mt-4">
        <div className="text-center">
          <div className="text-7xl font-semibold">{yearsLeft}</div>
          <div className="text-xl mt-2">Years of Longevity</div>
        </div>
      </div>

      <section id="about" className="w-full max-w-3xl mx-auto mt-16 px-8 sm:px-10 lg:px-12">
        <div className="space-y-6">
          <p className="text-lg">
            Welcome to age135, a revolutionary platform designed to calculate and optimize your longevity. Our cutting-edge algorithm takes into account various factors that influence human lifespan, with the ambitious goal of reaching 135 years - the theoretical maximum human lifespan.
          </p>
          <p className="text-lg">
            By analyzing your lifestyle choices, dietary habits, and exercise routines, age135 provides personalized insights and recommendations to help you maximize your years of healthy living. Let's embark on this journey to unlock your full longevity potential!
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Health Metrics</h2>
              <div className="space-y-4">
                <InputSlider label="Fasting Glucose (mg/dL)" value={fastingGlucose} onChange={setFastingGlucose} min={70} max={200} />
                <InputSlider label="Triglycerides (mg/dL)" value={triglycerides} onChange={setTriglycerides} min={50} max={500} />
                <InputSlider label="HDL (mg/dL)" value={hdl} onChange={setHdl} min={20} max={100} />
                <InputSlider label="Blood Pressure (systolic)" value={bloodPressure} onChange={setBloodPressure} min={90} max={180} />
                <InputSlider label="hs-CRP (mg/L)" value={hsCRP} onChange={setHsCRP} min={0} max={10} step={0.1} />
                <InputSlider label="Hemoglobin A1c (%)" value={hemoglobinA1c} onChange={setHemoglobinA1c} min={4} max={10} step={0.1} />
                <InputSlider label="Uric Acid (mg/dL)" value={uricAcid} onChange={setUricAcid} min={2} max={10} step={0.1} />
                <InputSlider label="Vitamin D (ng/mL)" value={vitaminD} onChange={setVitaminD} min={10} max={100} />
                <InputSlider label="Resting Heart Rate (bpm)" value={restingHeartRate} onChange={setRestingHeartRate} min={40} max={100} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Lifestyle Metrics</h2>
              <div className="space-y-4">
                <InputSlider label="Sleep (hours)" value={sleepHours} onChange={setSleepHours} min={4} max={12} step={0.5} />
                <InputSlider label="Stress Level (1-10)" value={stressLevel} onChange={setStressLevel} min={1} max={10} />
                <InputSlider label="Exercise (minutes/day)" value={exerciseMinutes} onChange={setExerciseMinutes} min={0} max={180} />
                <InputSlider label="Organic Food (%)" value={organicFoodPercentage} onChange={setOrganicFoodPercentage} min={0} max={100} />
                <InputSlider label="Processed Food Avoidance (1-10)" value={processedFoodAvoidance} onChange={setProcessedFoodAvoidance} min={1} max={10} />
                <InputSlider label="Sugar Intake (g/day)" value={sugarIntake} onChange={setSugarIntake} min={0} max={100} />
                <InputSlider label="Vegetable Servings (per day)" value={vegetableServings} onChange={setVegetableServings} min={0} max={10} />
                <InputSlider label="Steps per day" value={steps} onChange={setSteps} min={1000} max={20000} step={100} />
                <InputSlider label="Weight Lifting (days/week)" value={weightLiftingDays} onChange={setWeightLiftingDays} min={0} max={7} />
                <InputSlider label="Outdoor Time (minutes/day)" value={outdoorTimeMinutes} onChange={setOutdoorTimeMinutes} min={0} max={240} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Light and Sleep</h2>
              <div className="space-y-4">
                <ToggleInput label="Wake within one-hour window" value={wakeWithinOneHour} onChange={setWakeWithinOneHour} />
                <ToggleInput label="Fall asleep easily" value={fallAsleepEasily} onChange={setFallAsleepEasily} />
                <ToggleInput label="Stay asleep through night" value={stayAsleepThroughNight} onChange={setStayAsleepThroughNight} />
                <ToggleInput label="Use red lights at night" value={useRedLights} onChange={setUseRedLights} />
                <ToggleInput label="Use dimmers in evening" value={useDimmers} onChange={setUseDimmers} />
                <ToggleInput label="Use night mode on devices" value={useNightMode} onChange={setUseNightMode} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Meal Timing and Habits</h2>
              <div className="space-y-4">
                <ToggleInput label="Can fast for 14 hours" value={fastFourteenHours} onChange={setFastFourteenHours} />
                <ToggleInput label="Consistent meal times" value={consistentMealTimes} onChange={setConsistentMealTimes} />
                <ToggleInput label="Mindful eating" value={mindfulEating} onChange={setMindfulEating} />
                <ToggleInput label="Express gratitude before eating" value={gratitudeBeforeEating} onChange={setGratitudeBeforeEating} />
                <ToggleInput label="Eat slowly and methodically" value={eatSlowly} onChange={setEatSlowly} />
                <ToggleInput label="Sit while eating" value={sitWhileEating} onChange={setSitWhileEating} />
                <ToggleInput label="No phone while eating" value={noPhoneWhileEating} onChange={setNoPhoneWhileEating} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Mind-Body</h2>
              <div className="space-y-4">
                <ToggleInput label="Practice mindfulness daily" value={practicesMindfulness} onChange={setPracticesMindfulness} />
                <ToggleInput label="Worked with therapist" value={workedWithTherapist} onChange={setWorkedWithTherapist} />
                <ToggleInput label="Confident in body-mind connection" value={confidenceInBodyMindConnection} onChange={setConfidenceInBodyMindConnection} />
                <ToggleInput label="Have trusted person to talk to" value={hasTrustedPerson} onChange={setHasTrustedPerson} />
                <ToggleInput label="Express feelings openly" value={expressFeelingsOpenly} onChange={setExpressFeelingsOpenly} />
                <ToggleInput label="Have stress management strategies" value={hasStressStrategies} onChange={setHasStressStrategies} />
                <ToggleInput label="Ground regularly" value={groundsRegularly} onChange={setGroundsRegularly} />
                <ToggleInput label="Focus on gratitude daily" value={focusesOnGratitude} onChange={setFocusesOnGratitude} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Toxins</h2>
              <div className="space-y-4">
                <ToggleInput label="Filter tap water" value={filtersWater} onChange={setFiltersWater} />
                <ToggleInput label="Check water quality" value={checksWaterQuality} onChange={setChecksWaterQuality} />
                <ToggleInput label="Drink enough water daily" value={drinksEnoughWater} onChange={setDrinksEnoughWater} />
                <ToggleInput label="Avoid plastic water bottles" value={avoidsPlasticBottles} onChange={setAvoidsPlasticBottles} />
                <ToggleInput label="Avoid artificial flavors" value={avoidsArtificialFlavors} onChange={setAvoidsArtificialFlavors} />
                <ToggleInput label="Limited alcohol intake" value={limitedAlcoholIntake} onChange={setLimitedAlcoholIntake} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12 mb-16">
          <Button
            className="w-full max-w-md h-16 text-xl cta-button mb-4"
            onClick={calculateLongevity}
          >
            Calculate Longevity
          </Button>
          {showEstimatedLifespan && (
            <div className="text-lg text-gray-300 font-medium mt-2 transition-opacity duration-300 ease-in-out">
              Estimated Lifespan: {yearsLeft} years
            </div>
          )}
        </div>
      </div>

      <section className="mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-center">Longevity Meal: Components</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead className="sm:table-header-group hidden">
              <tr className="bg-gray-800">
                <th className="p-2 text-left">Micronutrients/Antioxidants</th>
                <th className="p-2 text-left">Fiber</th>
                <th className="p-2 text-left">Protein</th>
                <th className="p-2 text-left">Omega-3 Fats</th>
                <th className="p-2 text-left">Fermented Foods</th>
              </tr>
            </thead>
            <tbody>
              <tr className="sm:table-row flex flex-col mb-4 sm:mb-0">
                <td className="p-2 border-t border-gray-700 align-top">
                  <div className="font-bold mb-2 sm:hidden">Micronutrients/Antioxidants</div>
                  <ul className="list-disc pl-4">
                    <li>Roasting or sautéing vegetables</li>
                    <li>Asparagus</li>
                    <li>Bell peppers</li>
                    <li>Broccoli florets</li>
                    <li>Brussels sprouts</li>
                    <li>Cabbage</li>
                    <li>Carrots</li>
                    <li>Cauliflower florets</li>
                    <li>Celery root</li>
                    <li>Cherry tomatoes</li>
                    <li>Eggplant</li>
                    <li>Fennel</li>
                    <li>Green beans</li>
                    <li>Kohlrabi</li>
                    <li>Leeks</li>
                    <li>Mushrooms</li>
                  </ul>
                </td>
                <td className="p-2 border-t border-gray-700 align-top">
                  <div className="font-bold mb-2 sm:hidden">Fiber</div>
                  <ul className="list-disc pl-4">
                    <li>Chia seeds</li>
                    <li>Basil seeds</li>
                    <li>Flaxseeds</li>
                    <li>Lentils</li>
                    <li>Split peas</li>
                    <li>Beans</li>
                    <li>Konjac root products</li>
                    <li>Raspberries</li>
                    <li>Blackberries</li>
                    <li>Tahini</li>
                    <li>Brazil nuts</li>
                    <li>Almonds</li>
                    <li>Walnuts</li>
                    <li>Pecans</li>
                    <li>Hazelnuts</li>
                    <li>Pistachios</li>
                    <li>Avocados</li>
                  </ul>
                </td>
                <td className="p-2 border-t border-gray-700 align-top">
                  <div className="font-bold mb-2 sm:hidden">Protein</div>
                  <ul className="list-disc pl-4">
                    <li>Chicken breasts</li>
                    <li>Turkey cutlets</li>
                    <li>Pork (loin, tenderloin, etc.)</li>
                    <li>Beef (flank steak, sirloin, etc.)</li>
                    <li>Tofu</li>
                    <li>Tempeh</li>
                    <li>Ground pork</li>
                    <li>Ground lamb</li>
                    <li>Ground turkey</li>
                    <li>Ground beef</li>
                    <li>Ground venison</li>
                    <li>Ground bison</li>
                    <li>Shrimp</li>
                    <li>Scallops</li>
                    <li>Salmon</li>
                    <li>Sardines</li>
                    <li>Mackerel</li>
                    <li>Unsweetened Greek yogurt</li>
                    <li>Pastured eggs</li>
                    <li>Beans</li>
                    <li>Lentils</li>
                  </ul>
                </td>
                <td className="p-2 border-t border-gray-700 align-top">
                  <div className="font-bold mb-2 sm:hidden">Omega-3 Fats</div>
                  <ul className="list-disc pl-4">
                    <li>Salmon</li>
                    <li>Anchovies</li>
                    <li>Sardines</li>
                    <li>Mackerel</li>
                    <li>Chia seeds</li>
                    <li>Basil seeds</li>
                    <li>Flaxseeds</li>
                    <li>Hemp seeds</li>
                    <li>Pasture-raised eggs</li>
                  </ul>
                </td>
                <td className="p-2 border-t border-gray-700 align-top">
                  <div className="font-bold mb-2 sm:hidden">Fermented Foods</div>
                  <ul className="list-disc pl-4">
                    <li>Sauerkraut</li>
                    <li>Kimchi</li>
                    <li>Unsweetened yogurt</li>
                    <li>Kefir</li>
                    <li>Tempeh</li>
                    <li>Miso</li>
                    <li>Natto</li>
                    <li>Apple cider vinegar</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="bg-black bg-opacity-80 py-8 mt-16">
        <div className="max-w-3xl mx-auto px-8 sm:px-10 lg:px-12">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} age135. All rights reserved.
          </p>
          <p className="text-center text-yellow-400 text-sm mt-2">
            Warning: This is an investigational application. Results should not be considered as medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
}

function InputSlider({ label, value, onChange, min, max, step = 1 }: InputSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={label}>{label}</Label>
        <span>{value}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Input
          id={label}
          type="number"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="w-20 text-white bg-gray-800"
        />
        <Slider
          value={[value]}
          onValueChange={(vals: number[]) => onChange(vals[0])}
          min={min}
          max={max}
          step={step}
          className="flex-grow"
        />
      </div>
    </div>
  )
}

interface ToggleInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

function ToggleInput({ label, value, onChange }: ToggleInputProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        type="checkbox"
        checked={value === 1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked ? 1 : 0)}
        className="w-6 h-6"
      />
    </div>
  )
}