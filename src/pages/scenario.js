import { modal, hideModal } from '../modal.js'
import { createInput, sendEvent, readForm } from '../helper.js'
import { store } from '../store.js';

export function scenarioEdit(create = false) {
	let form = $("<form class='scenarioForm'></form>")
	let heading = ""

	// EditForm
	const data = store.getScenario()
	if (!create && data) {
		heading = "Edit Scenario"
		form.append(createInput("currentId", "currentId", data.name, "hidden", true))
			.append(createInput("Name", "name", data.name, "text", true))
			.append(createInput("Description", "tags_description", data.description, "text"))
			.append("<button class='btn-success btn'>Save</button>")
	}
	// create new Scenario
	else {
		heading = "Create Scenario"
		form.append(createInput("Name", "name", "", "text", true))
			.append(createInput("Description", "tags_description", "", "text"))
			.append("<button class='btn-success btn'>Create</button>")
	}

	form.submit((e) => {
		e.preventDefault()
		let formData = readForm(".scenarioForm")

		// CreateForm
		if (typeof formData.currentId == "undefined") {
			sendEvent(
				"dataReceived", {
					name: formData.name,
					tags: {
						description: formData.tags.description
					},
					children: []
				}
			)
		}
		// Edit Form
		else {
			store.updateScenario(formData)
		}

		hideModal()
	})

	modal(heading, form)
}
