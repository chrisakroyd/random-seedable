#include <stdint.h>
#include <iostream>

using namespace std;

// https://en.wikipedia.org/wiki/Xorshift#xorwow

struct xor_state {
    uint32_t x, y, z, w, v, d;
};

uint32_t xorwow_32(xor_state& state) {
    uint32_t t = state.x;
    uint32_t v = state.v;

    t ^= t >> 2;
    t ^= t << 1;
    v ^= v << 4;

    state.x = state.y;
    state.y = state.z;
    state.z = state.w;
    state.w = state.v;
    state.v = v ^ t;

    return (state.d += 362437) + state.v;
}

// uint32_t xorwow_32(xor_state& state) {
//     uint32_t t;
//     t = (state.x ^ (state.x >> 2));
//     state.x = state.y;
//     state.y = state.z;
//     state.z = state.w;
//     state.w = state.v;
//     state.v = (state.v ^ (state.v << 4)) ^ (t ^ (t <<1));
//     return (state.d += 362437) + state.v;
// }

int main()
{
    struct xor_state state;

    state.x = 123456789;
    state.y = 362436069;
    state.z = 521288629;
    state.w = 88675123;
    state.v = 5783321;
    state.d = 6615241;

    int i;
    int a = 20;

    for (i = 0; i < a; i++) {
        cout<<""<<xorwow_32(state);
        cout<<"\n";
    }

    return 0;
}
