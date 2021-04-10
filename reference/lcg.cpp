// Reference pseudo-random generator for test number generation.
#include <stdint.h>
#include <iostream>

using namespace std;

struct lgc_state {
    uint32_t x, a, c, m;
};


uint32_t lgc(lgc_state& state) {
    uint32_t x = (state.a * state.x + state.c) % state.m;
    state.x = x;
    return x;
}

int main()
{
    struct lgc_state state;

    state.x = 1234;
    state.a = 1664525;
    state.c = 1013904223;
    state.m = 4294967296;

    int i;
    int a = 10;

    for (i = 0; i < a; i++) {
        cout<<""<<lgc(state);
        cout<<"\n";
    }

    return 0;
}
