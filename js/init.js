/**
 * DOM Ready
 */
$(function() {
    var datam = new DataManager()
    var sb = new Sidebar(config.dom.sidebar)
    var cy = new CyptoScape(config.dom.canvasContainer)
    var map = new LeafleatMap(config.dom.mapContainerId)


    // Opens Page "Select Json"
    selectJson()


    /**
     * init menu listener
     */
    $(config.dom.links.json).click(() => {
        selectJson()
    })

    $(config.dom.links.map).click(() => {
        showMap()
    })

    $(config.dom.links.home).click(() => {
        home()
    })

    $(config.dom.links.style).click(() => {
        selectStyle()
    })

    $(config.dom.links.jsonSettings).click(() => {
        jsonSettings()
    })

    


    document.addEventListener("sidebar", (e) => {
        switch(e.detail.task) {
            case "showId":
                showId(e.detail.data)
                break
            case "addNode":
                sb.addNode(e.detail.data.pos, e.detail.data.eles)
                break
        }
    })

    // Init Event Reciver 
    document.addEventListener("dataReceived", (e) => {
        initListenerDataRevieved()
        datam.json = e.detail

        sendEvent("explorer", {
            task: "initElements",
            data: datam.json
        })

        showId(datam.json.children[0].name)
        showGraph();
    })


    function showId(id) {        
        var data = datam.getElement(id)

        sb.showData(data)
        sb.createForm(data, datam.json.children)
    }

    function initListenerDataRevieved() {
        $(config.dom.links.graph).click(() => {
            setActiveMenuItem("Explorer")
            showGraph()
        }).click()

        $(config.dom.links.map).click(() => {
            setActiveMenuItem("Map")
            showMap()
        }).parent("li").removeClass("disabled")

        $(config.dom.links.download).click(() => {
            var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datam.json))
            $(config.dom.links.download).prop("href", "data:" + data)
            $(config.dom.links.download).prop("download", "data.json")
        }).parent("li").removeClass("disabled")
    }
})