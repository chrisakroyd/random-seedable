// Reference pseudo-random generator for test number generation.
#include <stdint.h>
#include <iostream>

using namespace std;

// https://en.wikipedia.org/wiki/Permuted_congruential_generator

struct pcg_state {
    uint64_t x, mul, inc;
};

static uint32_t rotr32(uint32_t x, unsigned r)
{
	return x >> r | x << (-r & 31);
}

uint32_t pcg32(pcg_state& state)
{
	uint64_t x = state.x;
	unsigned count = (unsigned) (x >> 59);		// 59 = 64 - 5

	state.x = x * state.mul + state.inc;
	x ^= x >> 18;								// 18 = (64 - 27)/2
	return rotr32((uint32_t)(x >> 27), count);	// 27 = 32 - 5
}

// void pcg32_init(uint64_t seed)
// {
// 	state = seed + inc;
// 	(void)pcg32();
// }

uint32_t bounded_rand(pcg_state& state, uint32_t range) {
    // calculates 2**32 % range
    uint32_t t = (-range) % range;
    for (;;) {
        uint32_t r = pcg32(state);
        if (r >= t)
            return r % range;
    }
}

int main()
{
    struct pcg_state state;

    state.x = 0x4d595df4d0f33173;  // Or something seed-dependent
    state.mul = 6364136223846793005u;
    state.inc = 1442695040888963407u; // Or an arbitrary odd constant

    int i;
    int a = 20;

    for (i = 0; i < a; i++) {
        cout<<""<<pcg32(state);
        cout<<"\n";
    }

    return 0;
}
