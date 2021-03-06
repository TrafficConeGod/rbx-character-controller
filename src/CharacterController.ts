import { StateController, State } from "./StateController"
import { MovementController } from "./MovementController"
import { Players } from "rbx-services"
import { AnimationController } from "./AnimationController";
const player = Players.LocalPlayer as Player
const playerScripts = player.WaitForChild("PlayerScripts") as PlayerScripts

interface ControlModule {

    Enable: (controlModule: ControlModule) => void
    Disable: (controlModule: ControlModule) => void

}

export { State } from "./StateController"

export { Animation } from "./AnimationController"

export class CharacterController {

    constructor(character: Model) {
        
        if (!character.PrimaryPart) {

            error("No primaryPart found on the character.")

        }
        
        spawn(() => {
  
            if (!game.IsLoaded) {
                
                game.Loaded.Wait()

            }

            if (playerScripts.FindFirstChild("PlayerModule") && playerScripts.WaitForChild("PlayerModule").FindFirstChild("ControlModule")) {
    
                const controlModule = require(playerScripts.WaitForChild("PlayerModule").WaitForChild("ControlModule") as ModuleScript) as ControlModule
                controlModule.Disable(controlModule)
    
            }

        })

        player.Character = character
        this.character = character
        this.movementController = new MovementController(this)
        this.stateController = new StateController(this)
        this.animationController = new AnimationController(this)

    }

    // MovementController

    getVelocity() {

        return this.movementController.velocity

    }

    setVelocity(velocity: Vector3) {

        this.movementController.velocity = velocity

    }

    getMobile() {

        return this.movementController.mobile

    }

    setMobile(mobile: boolean) {

        this.movementController.mobile = mobile

    }

    // Humanoid only methods

    bounce(height: number) {

        this.movementController.bounce(height)

    }

    move(position: Vector3) {

        this.movementController.move(position)

    }

    isGrounded() {

        return this.movementController.isGrounded()

    }

    isMoving() {

        return this.movementController.isMoving()

    }

    humanoidStateChanged(event: Function): RBXScriptConnection {

        return this.movementController.humanoidStateChanged(event)

    }

    landed(event: Function): RBXScriptConnection {

        return this.movementController.landed(event)

    }

    getPrimaryPart() {

        return this.movementController.primaryPart
        
    }

    getHumanoid() {

        return this.movementController.humanoid
        
    }

    // StateController

    addState(state: typeof State) {
        
        this.stateController.addState(state)

    }

    addStates(states: Array<typeof State>) {
        
        this.stateController.addStates(states)

    }

    setState(stateName: string) {

        this.stateController.setState(stateName)

    }

    getState() {

        return this.stateController.getState()

    }

    // AnimationController

    loadAnimation(animationId: number) {

        return this.animationController.loadAnimation(animationId)

    }

    getAnimatable() {

        return this.animationController.getAnimatable()

    }

    setAnimatable(animatable: boolean) {

        this.animationController.setAnimatable(animatable)

    }

    // Properties

    character: Model
    private movementController: MovementController
    private stateController: StateController
    private animationController: AnimationController

}