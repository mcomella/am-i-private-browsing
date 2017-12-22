package org.mozilla.pbtest

import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.content.files
import io.ktor.content.static
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.sessions.Sessions
import io.ktor.sessions.cookie
import java.io.File

private const val LOCAL_STATIC_DIR = "static"
private val INDEX_FILE = File("$LOCAL_STATIC_DIR/index.html")

const val CLASS_PASS = "pass"
const val CLASS_FAIL = "fail"

fun Application.main() {
    installFeatures()
    routing {
        get("/") {
            val indexText = INDEX_FILE.readText()
                    .substituteAndSetCookies(call)
            call.respondText(indexText, ContentType.Text.Html, HttpStatusCode.OK)
        }

        // TODO: there's probably a better way.
        static("js") {
            files("$LOCAL_STATIC_DIR/js")
        }

        static("css") {
            files("$LOCAL_STATIC_DIR/css")
        }
    }
}

private fun Application.installFeatures() {
    install(DefaultHeaders)
    install(CallLogging)
    install(Sessions) { cookie<Session>("CookieKey") }
}
