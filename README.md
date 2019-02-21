# rbx-character-controller

# NOTE: The is currently a bug that occasionally causes ControlModule to be active. In the meantime you should disable ControlModule.

## Example
```ts
import { CharacterController, State } from "rbx-character-controller"
import { UserInputService } from "rbx-services"

const characterController = new CharacterController(character)

const states = new Array<typeof State>()

class None extends State {

    static id = "None"

    static init() {
        
        
        
    }

    static start() {

        characterController.setVelocity(new Vector3())

    }

    static stop() {
        

        
    }

}
states.push(None)

class Jump extends State {

    static id = "Jump"

    static init() {
        
        UserInputService.InputBegan.Connect(input => {

            if (input.KeyCode === Enum.KeyCode.Space) {

                if (characterController.isGrounded()) {

                    characterController.setState("Jump")
    
                }

            }

        })

    }

    static start() {

        characterController.bounce(50)

        const connection = characterController.landed(() => {

            connection.Disconnect()

            if (characterController.getState() === "Jump") {

                characterController.setState("None")

            }

        })

    }

    static stop() {

        

    }

}
states.push(Jump)

characterController.addStates(states)
```

## Documentation

### CharacterController
```ts
constructor(character: Model)
// Creates a new CharacterController. Expressed as new CharacterController(character).

getVelocity(): Vector3
// Gets the character velocity.

setVelocity(velocity: Vector3)
// Sets the character velocity.

getMobile(): boolean
// Returns true if the character is mobile.

setMobile(mobile: boolean)
// Sets the mobile state.

bounce(height: number)
// Bounces the character to the specified height

move(direction: Vector3)
// Moves the character in the specified direction.

isGrounded(): boolean
// Returns true if the character is grounded.

isMoving(): boolean
// Returns true if the character is moving

humanoidStateChanged(event: Function): RBXScriptConnection
// Runs event when the humanoid state changes.

landed(event: Function): RBXScriptConnection
// Runs when the character lands.

getPrimaryPart(): BasePart
// Gets the primary part of the character.

getHumanoid(): Humanoid
// Gets the humanoid of the character.

addState(state: typeof State)
// Adds a state to the character.

addStates(states: Array<typeof State>)
// Adds states to the character.

setState(stateName: string)
// Sets the character state.

getState()
// Gets the character state.

character: Model
// The character model.

movementController: MovementController
// The movementController.

stateController: StateController
// The stateController.
```

### State
```ts
static id: string
// The id of the state.

static init()
// Called when the state initializes.

static start()
// Called when the state starts.

static stop()
// Called when the state stops.
```
