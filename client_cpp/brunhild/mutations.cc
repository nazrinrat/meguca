#include "mutations.hh"
#include <emscripten.h>
#include <set>

namespace brunhild {
using std::string;

// All pending mutations quickly accessible by element ID
std::unordered_map<string, Mutations> mutations;

// Stores mutation order, so we can somewhat make sure, new children are not
// manipulated, before insertion.
std::set<string> mutation_order;

// Push simple vector-based mutation to stack
#define push_mutation(typ)                                                     \
    auto& mut = mutations[id];                                                 \
    mut.typ.push_back(html);                                                   \
    mutation_order.insert(id);

void append(string id, string html) { push_mutation(append) }

void prepend(string id, string html) { push_mutation(prepend) }

void before(string id, string html) { push_mutation(before) }

void after(string id, string html) { push_mutation(after) }

void set_inner_html(string id, string html)
{
    auto& mut = mutations[id];

    // These would be overwritten, so we can free up used memory
    mut.free_inner();

    mut.set_inner_html = html;
    mutation_order.insert(id);
}

void set_outer_html(string id, string html)
{
    auto& mut = mutations[id];
    mut.free_outer();
    mut.set_outer_html = html;
    mutation_order.insert(id);
}

void remove(string id)
{
    auto& mut = mutations[id];
    mut.free_outer();
    mut.remove_el = true;
    mutation_order.insert(id);
}

void set_attr(string id, string key, string val)
{
    auto& mut = mutations[id];
    mut.set_attr[id] = key;
    mutation_order.insert(id);
}

void remove_attr(string id, string key)
{
    auto& mut = mutations[id];
    mut.set_attr.erase(key);
    mutation_order.insert(key);
}

void Mutations::free_inner()
{
    append.clear();
    prepend.clear();
    set_inner_html.clear();
}

void Mutations::free_outer()
{
    free_inner();
    remove_attr.clear();
    set_attr.clear();
    set_outer_html.clear();
}

extern "C" void flush()
{
    for (const string& id : mutation_order) {
        mutations.at(id).exec(id);
    }
    mutation_order.clear();
    mutations.clear();
}

void Mutations::exec(const string& id)
{
    auto c_id = id.c_str();

    // TODO: Do these loops in one JS call, if possible

    // Before and after inserts need to happen, even if the element is going to
    // be removed
    for (auto& html : before) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($0));
                if (!el) {
                    return 0;
                }
                var cont = document.createElement('div');
                cont.innerHTML = Pointer_stringify($1);
                el.parentNode.insertBefore(cont.firstChild, el);
                return 0;
            },
            c_id, html.c_str());
    }
    for (auto& html : after) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($0));
                if (!el) {
                    return 0;
                }
                var cont = document.createElement('div');
                cont.innerHTML = Pointer_stringify($1);
                el.parentNode.insertBefore(cont.firstChild, el.nextSibling);
                return 0;
            },
            c_id, html.c_str());
    }

    if (remove_el) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($0));
                if (!el) {
                    el.parentNode.removeChild(el);
                }
                return 0;
            },
            c_id);
        // If the element is to be removed, nothing else needs to be done
        return;
    }

    if (set_outer_html.size()) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($0));
                if (el) {
                    el.outerHTML = Pointer_stringify($1);
                }
                return 0;
            },
            c_id, set_outer_html.c_str());
    }
    if (set_inner_html.size()) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($0));
                if (el) {
                    el.innerHTML = Pointer_stringify($1);
                }
                return 0;
            },
            c_id, set_inner_html.c_str());
    }

    for (auto& html : append) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($0));
                if (!el) {
                    return 0;
                }
                var cont = document.createElement('div');
                cont.innerHTML = Pointer_stringify($1);
                el.parentNode.insertBefore(cont.firstChild, el.nextSibling);
                return 0;
            },
            c_id, html.c_str());
    }
    for (auto& html : prepend) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($0));
                if (!el) {
                    return 0;
                }
                var cont = document.createElement('div');
                cont.innerHTML = Pointer_stringify($1);
                el.insertBefore(cont.firstChild, el.firstChild);
                return 0;
            },
            c_id, html.c_str());
    }

    for (auto& kv : set_attr) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($0));
                if (el) {
                    el.setAttribute(
                        Pointer_stringify($1), Pointer_stringify($2));
                }
                return 0;
            },
            c_id, kv.first.c_str(), kv.second.c_str());
    }
    for (auto& key : remove_attr) {
        EM_ASM_INT(
            {
                var el = document.getElementById(Pointer_stringify($1));
                if (el) {
                    el.removeAttribute(Pointer_stringify($1));
                }
                return 0;
            },
            c_id, key.c_str());
    }
}
}