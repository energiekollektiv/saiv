import { modal, hideModal } from '../modal.js'
import { createSelect, sendEvent, readForm } from '../helper.js'
import { globals, config } from '../globals.js'
import 'select2';
import 'select2/dist/css/select2.css';



export function selectStyle() {
	return new Promise((resolve, reject) => {

		let currentStyle = localStorage.getItem("style") ? localStorage.getItem("style") : config.cytoscape.defaultStyle
		let currentAutoLayout = localStorage.getItem("autoLayout") ? localStorage.getItem("autoLayout") : globals.autoLayout
		let form = $('<form class="editStyle selectStyle"></form>')

		form.append(createSelect("style", [currentStyle], config.cytoscape.styles))

		if (currentAutoLayout == "true") {
			form.append('<div class="form-group"><label for="autoLayout">Relayout Explorer after adding Elements</label><input checked class="" type="checkbox" name="autoLayout"></div>')
		} else {
			form.append('<div class="form-group"><label for="autoLayout">Relayout Explorer after adding Elements</label><input class="" type="checkbox" name="autoLayout"></div>')
		}


		form.append('<button class="btn btn-success">Save</button>')
		form.submit(e => {
			e.preventDefault()
			let data = readForm(".editStyle")

			if (typeof data.autoLayout != "undefined") {
				globals.autoLayout = "true"
			} else {
				globals.autoLayout = "false"
			}

			localStorage.setItem("style", data.style)
			localStorage.setItem("autoLayout", globals.autoLayout)

      if(currentStyle != data.style)
			   resolve(data.style)
      else {
        reject()
      }

			hideModal()
		})

		modal("Set Explorer Styles", form)
		$('.basic-select', form).select2()
	})
}
