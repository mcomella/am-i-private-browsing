package org.mozilla.pbtest

import io.ktor.application.ApplicationCall
import io.ktor.sessions.get
import io.ktor.sessions.sessions
import io.ktor.sessions.set

private val REGEX_COOKIE_RESULT = Regex("""%cookie-result%""")

data class Session(val value: String)

// todo: method name not transparent.
fun String.substituteAndSetCookies(call: ApplicationCall): String {
    val isCookieSet = call.sessions.get<Session>() != null
    call.sessions.set(Session("CookieValue")) // for the return request.

    val cookieClassSubstitution = if (!isCookieSet) CLASS_PASS else CLASS_FAIL
    return replace(REGEX_COOKIE_RESULT, cookieClassSubstitution)
}
