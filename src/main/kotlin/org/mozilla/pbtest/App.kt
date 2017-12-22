package org.mozilla.pbtest

import io.ktor.application.Application
import io.ktor.application.install
import io.ktor.content.default
import io.ktor.content.files
import io.ktor.content.static
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.routing.routing

private const val LOCAL_STATIC_DIR = "static"

fun Application.main() {
    installFeatures()
    routing {
        static("") {
            files(LOCAL_STATIC_DIR)
            default("$LOCAL_STATIC_DIR/index.html")
        }
    }
}

private fun Application.installFeatures() {
    install(DefaultHeaders)
    install(CallLogging)
}
