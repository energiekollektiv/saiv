class sidebar{
	/*(function init (){

		$(".sidebar-toggle").on("click", function() {
	        $("body").toggleClass("sidebar-closed")
	        cy.resize()
	    })
	    
	})()*/

	showData (data) {
		this.open()
		$(".head").html(JSON.stringify(data))
	}

	addTag (element, ready) {
		element.html("")
		var form = $('<form class="editForm"></form>')

		form.append(createInput("Tag name", "tag", "", "text", true))
		form.append('<input type="submit" value="Save">')

		form.submit((e) => {
			e.preventDefault()
			ready(this.readForm().tag)
		})

		element.append(form)
	}

	readForm () {
	    var formData = {}
	    $(".form input").serializeArray().forEach(field => {
	    	if (field.name.substring(0, 5) == "tags_") {
	            if (typeof(formData.tags) === "undefined") formData.tags = {}

	            formData.tags[field.name.substring(5, field.name.length)] = field.value
	        } 
	        else {
	            formData[field.name] = field.value
	        }
	    })

	    $(".form select").val(function( index, value ) {
	        formData[this.name] = value
	    })
	    return formData
	}

	createForm (element, data, nodes) {
		element.html("")
		var form = $('<form class="editForm"></form>')


		form.append(createInput("currentid", "currentid", data.name, "hidden"))

		if (data.type == 'scenario') {
			//form.append(createInput("name", "name", data.id, "text"))
			form.append(createInput("type", "type", data.type, "hidden"))
		}

		for (let [key, value] of Object.entries(data)) {
			if (key == "tags") {
				form.append('<label>Tags</label><br/>')
				if(data.type != "scenario")
					form.append('<a href="#" class="addTag">Add Tag</label><br/>')

				for (let [tagKey, tagValue] of Object.entries(data[key])) {
					form.append('<a href="#" class="removeTag">Remove ' + tagKey + '</a><br/>')
					form.append(createInput(tagKey, "tags_" + tagKey, tagValue, "text"))
				}
			} else if (key == "predecessors" || key == "successors") {
				form.append(createSelect(key, value, nodes))
				$('.js-example-basic-multiple', form).select2()
			} else {
				form.append(createInput(key, key, value, "text"))
			}
		}

		form.append('<input type="submit" value="Save">')
		form.submit(e => {
			e.preventDefault()

			var event = new CustomEvent("updateNode", {"detail": this.readForm()})
			document.dispatchEvent(event)
		})
		element.append(form)
	}

	addNode (element, pos, nodes) {
		element.html("")
		var form = $('<form class="editForm"></form>')
		form.append(createInput("name", "name", "", "text", true))
		form.append(createInput("type", "type", "", "text", true))
		form.append(createInput("posx", "posx", pos.x, "hidden"))
		form.append(createInput("posy", "posy", pos.y, "hidden"))

		form.append('<input type="submit" value="Add Node">')


		form.submit(e => {
			e.preventDefault()

			var event = new CustomEvent("addNode", {"detail": this.readForm()})
			document.dispatchEvent(event)
		})
		element.append(form)
	}

	open () {
		$("body").toggleClass("sidebar-closed", false)
	}
}