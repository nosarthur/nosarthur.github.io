---
layout: post
title: "Why λ₂ measures graph connectivity"
date: 2026-09-03 00:00:00 -0400
categories: [math and physics]
comments: true
tags: [linear algebra, graph theory, spectral graph theory]
---

Connectivity, as graph theory first defines it, is a yes/no property:
either you can walk from any node to any other one, or you cannot.
That is a blunt instrument.
A ten-node path and a ten-node ring are both connected,
yet cutting one edge destroys the path and merely dents the ring.
What we want is a dial, not a switch.

The standard dial is $$\lambda_2$$, the second smallest eigenvalue of the graph
Laplacian, named the **algebraic connectivity** by Fiedler in 1973.
It is zero exactly when the graph falls apart,
small when the graph is nearly in two pieces,
and large when every part of the graph is firmly tied to every other part.

Why should an eigenvalue of a matrix know any of this?
All of it follows from a single identity — the Laplacian quadratic form —
and the rest of this post is that identity, pushed as far as it will go.

**Contents**

<!-- prettier-ignore -->
- TOC
{:toc}

## the quadratic form

Take an undirected graph with $$n$$ nodes and $$m$$ edges,
each edge carrying a positive weight $$w_{ab}$$
(set every weight to $$1$$ if the graph is unweighted).
Let $$\mathbf A$$ be the weighted adjacency matrix,
$$A_{ab} = w_{ab}$$ if $$a\sim b$$ and $$0$$ otherwise,
and $$\mathbf D$$ the diagonal matrix of weighted degrees
$$d_a = \sum_b w_{ab}$$. The **graph Laplacian** is

$$ \mathbf L = \mathbf D - \mathbf A $$

Now hand every node a number $$x_a$$ — a height, a potential, a temperature,
an opinion, a per-ligand free energy, whatever you like — and evaluate the
quadratic form. The claim is

$$
\mathbf x^\mathsf T\mathbf L\mathbf x
 = \sum_{(a,b)\in E} w_{ab}\,(x_b - x_a)^2
$$

The verification is one line of bookkeeping. The degree term counts each edge
twice, once from each end,

$$
\mathbf x^\mathsf T\mathbf D\mathbf x = \sum_a d_a x_a^2
 = \sum_{(a,b)\in E} w_{ab}\,(x_a^2 + x_b^2)
$$

while the adjacency term counts each edge twice as a cross term,
$$\mathbf x^\mathsf T\mathbf A\mathbf x = 2\sum_{(a,b)\in E} w_{ab}\,x_a x_b$$.
Subtracting completes the square on every edge.

There is a more structural derivation.
Let $$\mathbf B$$ be the $$m\times n$$ signed incidence matrix,
whose row for edge $$a\to b$$ is $$\mathbf e_b - \mathbf e_a$$,
and $$\mathbf W = \mathrm{diag}(w)$$. Then $$\mathbf L = \mathbf B^\mathsf T\mathbf W\mathbf B$$ and

$$
\mathbf x^\mathsf T\mathbf L\mathbf x
 = \|\mathbf W^{1/2}\mathbf B\mathbf x\|^2
$$

$$\mathbf B\mathbf x$$ is the list of differences across edges — the discrete
gradient of $$\mathbf x$$ on the graph — so the quadratic form is the squared
gradient, and $$\mathbf L$$ is minus the discrete Laplace operator.
(This is the same $$\mathbf B$$ and the same $$\mathbf L$$ that show up when
fitting per-node values to edge measurements; see
[cycle closure]({% post_url 2026-08-09-cycle-closure %}).)

Call it Dirichlet energy, or the elastic energy of a network of springs with
stiffnesses $$w_{ab}$$, or the power dissipated by a resistor network with
conductances $$w_{ab}$$ held at potentials $$x_a$$ — one sentence covers every case:

**$$\mathbf x^\mathsf T\mathbf L\mathbf x$$ is the total disagreement between
neighbours, weighted by how strongly they are tied.**

Everything below is a consequence of this being a sum of squares.

### what the form gives away immediately

**1. $$\mathbf L$$ is positive semidefinite.**
A sum of squares is never negative, so all eigenvalues are real and non-negative.
Order them $$0 \le \lambda_1 \le \lambda_2 \le \cdots \le \lambda_n$$.

**2. Constants are free.**
A flat assignment has no disagreement, so $$\mathbf L\mathbf 1 = \mathbf 0$$
and $$\lambda_1 = 0$$ always.
This is a gauge freedom: only differences of $$x$$ are visible to $$\mathbf L$$.

**3. Zero energy means locally constant.**
Since every term in the sum is non-negative,
$$\mathbf x^\mathsf T\mathbf L\mathbf x = 0$$ forces $$x_a = x_b$$ on *every*
edge, hence $$\mathbf x$$ is constant on each connected component — and
conversely. So the null space of $$\mathbf L$$ is spanned by the indicator
vectors of the components, and

$$
\dim\ker\mathbf L = \#\{\text{connected components}\}
\qquad\Longrightarrow\qquad
\lambda_2 > 0 \iff G \text{ is connected}
$$

That is the switch, and it already justifies the name.
The interesting question is the dial: when $$\lambda_2$$ is positive but small,
small compared to what, and why?

## λ₂ is the cheapest disagreement

By Courant–Fischer, the second eigenvalue is the minimum of the Rayleigh
quotient over the directions orthogonal to the first eigenvector:

$$
\lambda_2
 = \min_{\substack{\mathbf x\neq\mathbf 0\\ \mathbf x\perp\mathbf 1}}
   \frac{\mathbf x^\mathsf T\mathbf L\mathbf x}{\mathbf x^\mathsf T\mathbf x}
 = \min_{\substack{\sum_a x_a = 0}}
   \frac{\sum_{(a,b)\in E} w_{ab}(x_b - x_a)^2}{\sum_a x_a^2}
$$

Read the two sums separately.
The numerator is disagreement counted **over edges**;
the denominator is how far the assignment is from flat, counted **over nodes**.
The constraint $$\mathbf x\perp\mathbf 1$$ just removes the free constant mode —
without it the minimum would be $$0$$ and we would learn nothing.

So $$\lambda_2$$ answers a concrete question:
**how flat can a non-constant assignment of numbers to nodes be?**
The minimizer is the smoothest labelling the graph permits;
$$\lambda_2$$ is the roughness it cannot get rid of.
If some labelling manages to spread the nodes far apart (large denominator)
while crossing only a few weak edges (small numerator), then $$\lambda_2$$ is
small — and such a labelling *is* a description of a soft spot in the graph.
That is the entire intuition, and the rest is making it quantitative.

There is a tidier, gauge-free way to write the same thing.
For a mean-zero $$\mathbf x$$,

$$
\sum_{a<b}(x_a - x_b)^2 = n\sum_a x_a^2 - \Big(\sum_a x_a\Big)^2 = n\,\|\mathbf x\|^2
$$

and since both numerator and denominator of the ratio below are unchanged when a
constant is added to every $$x_a$$, the constraint can be dropped entirely:

$$
\lambda_2 = n \min_{\mathbf x\ \text{non-constant}}
 \frac{\sum_{(a,b)\in E} w_{ab}(x_b - x_a)^2}{\sum_{a<b}(x_a - x_b)^2}
$$

The denominator is the very same energy evaluated on the *complete* graph with
unit weights. So up to the factor $$n$$, $$\lambda_2$$ is the worst-case ratio
between the disagreement your edges happen to see and the disagreement that
exists among all pairs. A graph earns a large $$\lambda_2$$ only if its edges are
placed so that no pattern of node values can hide from them.
Consistently, $$\lambda_2(K_n) = n$$: on the complete graph the ratio is $$1$$
for every $$\mathbf x$$.

This is the sentence I would keep if I had to throw away the rest:
**$$\lambda_2$$ measures how well the graph's edges imitate all-pairs coupling.**

## every bottleneck caps λ₂

Because $$\lambda_2$$ is a minimum, every trial vector hands you an upper bound
for free — the variational method of quantum mechanics, in graph clothing.
The crudest useful trial vector is a two-block guess.
Split the nodes into $$S$$ and its complement $$\bar S$$, with $$s = \lvert S\rvert$$, and set

$$
x_a = \begin{cases} n - s, & a \in S\\ -s, & a \notin S\end{cases}
$$

which sums to zero as required.
Any edge with both ends inside $$S$$, or both inside $$\bar S$$, contributes
nothing; an edge across the divide contributes $$w_{ab}\,n^2$$.
The denominator is $$s(n-s)^2 + (n-s)s^2 = n\,s(n-s)$$. Hence, for every $$S$$,

$$
\lambda_2 \le \frac{n\ \mathrm{cut}_w(S)}{\lvert S\rvert\,\lvert\bar S\rvert},
\qquad
\mathrm{cut}_w(S) = \sum_{a\in S,\ b\notin S} w_{ab}
$$

A cut that is both **sparse** (little weight crossing) and **balanced**
($$\lvert S\rvert\lvert\bar S\rvert$$ large, at most $$n^2/4$$) drives
$$\lambda_2$$ down. Three consequences fall out at once.

- Take $$S = \{a\}$$, a single node: $$\lambda_2 \le n\,d_a/(n-1)$$, so
  $$\lambda_2 \le \frac{n}{n-1}\,d_{\min}$$.
  One poorly attached node caps the whole graph, no matter how well knit the rest is.
- If the graph is disconnected, some $$S$$ has $$\mathrm{cut}_w(S) = 0$$ and
  $$\lambda_2 = 0$$, recovering the earlier statement.
- Fiedler's theorem, which I will quote rather than prove: for any graph that is
  not complete, $$\lambda_2 \le \kappa_v(G)$$, the **vertex connectivity** — the
  number of nodes you must delete to disconnect the graph.
  So $$\lambda_2$$ is a lower bound on how many nodes have to fail before the
  graph splits. The name is not a metaphor.

As a running example, take two 5-cliques joined by a single edge.
With $$S$$ one clique, the bound gives
$$\lambda_2 \le 10\cdot 1/(5\cdot 5) = 0.4$$,
and the truth is $$\lambda_2 = 0.2984$$.
The vertex bound is much weaker here: a single node (either end of the bridge)
disconnects it, so $$\kappa_v = 1$$ and $$\lambda_2 \le 1$$.

## the converse: no bottleneck, no small λ₂

Upper bounds alone would be a poor advertisement — plenty of quantities are
small when a graph has a bottleneck. What makes $$\lambda_2$$ *the* measure is
that the implication runs both ways. Define the isoperimetric number
(also called the Cheeger constant)

$$
h(G) = \min_{S}\ \frac{\mathrm{cut}_w(S)}{\min(\lvert S\rvert, \lvert\bar S\rvert)}
$$

Then, with $$d_{\max}$$ the largest weighted degree,

$$
\frac{h(G)^2}{2\,d_{\max}} \ \le\ \lambda_2 \ \le\ 2\,h(G)
$$

The right inequality is just the cut bound above, with the balance factor traded
away: for $$s \le n/2$$, $$n/(s(n-s)) \le 2/s$$.
The left inequality — Cheeger's inequality, the discrete cousin of the
Riemannian one — is the substantial half, and it says that a graph with no
sparse cut cannot have a small $$\lambda_2$$.

Sandwiched between $$h^2/2d_{\max}$$ and $$2h$$, the eigenvalue is small exactly
when a sparse balanced cut exists. This equivalence is what promotes
$$\lambda_2$$ from "an eigenvalue that happens to vanish on disconnected graphs"
to a genuine measure of connectivity. Note that the two sides are not tight
together: the lower bound is quadratic in $$h$$ and degrades with $$d_{\max}$$.
That looseness is real, not proof slack, and it is one reason degree-heterogeneous
graphs are usually analysed with the normalized Laplacian instead.

## monotonicity, and a table to calibrate against

One more freebie from the quadratic form.
Adding an edge, or raising any weight, adds a non-negative term to
$$\mathbf x^\mathsf T\mathbf L\mathbf x$$ for *every* $$\mathbf x$$,
while the feasible set of the minimization is unchanged. Therefore

$$ w \le w' \ \text{edgewise} \quad\Longrightarrow\quad \lambda_2 \le \lambda_2' $$

$$\lambda_2$$ is monotone in the graph: more connection never lowers it,
deleting edges never raises it. Any honest connectivity measure must do this.

Some values to calibrate intuition (unit weights, $$\kappa_v$$ is the vertex connectivity):

| graph                    |   n |   m | $$\lambda_2$$ | $$\kappa_v$$ |
| ------------------------ | --: | --: | ------------: | -----------: |
| path $$P_{10}$$          |  10 |   9 |        0.0979 |            1 |
| binary tree, depth 3     |  15 |  14 |        0.0968 |            1 |
| two $$K_5$$, one link    |  10 |  21 |        0.2984 |            1 |
| ring $$C_{10}$$          |  10 |  10 |        0.3820 |            2 |
| star, one hub + 9 leaves |  10 |   9 |        1.0000 |            1 |
| $$3\times3$$ grid        |   9 |  12 |        1.0000 |            2 |
| Petersen                 |  10 |  15 |        2.0000 |            3 |
| $$K_{5,5}$$              |  10 |  25 |        5.0000 |            5 |
| $$K_{10}$$               |  10 |  45 |       10.0000 |            9 |

The instructive pair is the barbell and the star.
The barbell has $$21$$ edges and minimum degree $$4$$;
the star has $$9$$ edges and minimum degree $$1$$;
yet the star's $$\lambda_2$$ is more than three times larger.
Edge count is not connectivity.
What matters is the best cut available to an adversary,
and the star's cheapest cut is maximally *unbalanced* — one leaf against nine
nodes, $$\lvert S\rvert\lvert\bar S\rvert = 9$$ — while the barbell's is
maximally balanced, $$5\times 5 = 25$$.
Cutting off a leaf barely changes the graph; splitting it down the middle does.

A few asymptotics worth remembering:
the path has $$\lambda_2 = 2(1-\cos\frac{\pi}{n}) \approx \pi^2/n^2$$ and
the ring $$2(1-\cos\frac{2\pi}{n}) \approx 4\pi^2/n^2$$, both vanishing as they
grow; the star sits at exactly $$1$$ for every $$n$$;
the hypercube $$Q_d$$ has $$\lambda_2 = 2$$ in every dimension;
and $$K_n$$ has $$\lambda_2 = n$$.
A family of graphs with bounded degree whose $$\lambda_2$$ stays above a fixed
constant as $$n\to\infty$$ is precisely an **expander family** —
sparse graphs that are nonetheless as hard to cut as dense ones.

![Fiedler vectors and λ₂ for three graphs on ten nodes](/assets/lambda2_fiedler.svg)

The picture shows the minimizing assignment — the second eigenvector, called the
**Fiedler vector** — for three graphs on ten nodes,
with the links between the two halves drawn dark.
On the path, the flattest non-constant labelling is a half cosine,
the discrete version of the lowest vibration mode of a free bar;
it changes by only a little across each of the nine edges, so $$\lambda_2$$ is tiny.
On the barbell it is nearly a step function: two nearly flat plateaus and one
expensive edge, which is the cheapest possible disagreement when a single link
must carry it. Add two more links and the plateaus tilt, no assignment can stay
that flat, and $$\lambda_2$$ triples.

## you cannot buy connectivity with a single link

Keep the barbell but let the single joining link have weight $$w$$,
and watch $$\lambda_2$$ as $$w$$ grows.

![λ₂ against link weight, and consensus decay](/assets/lambda2_dynamics.svg)

For small $$w$$ the eigenvalue follows the cut bound,
$$\lambda_2 \to n w/(\lvert S\rvert\lvert\bar S\rvert) = 0.4\,w$$:
the two cliques are internally rigid, so the only cheap disagreement is the
step across the link, and it costs exactly $$w$$ per unit of step.
But the curve bends over and saturates at $$\lambda_2 = 1$$.
The reason is Fiedler's bound.
As $$w\to\infty$$ the two endpoints of the link are welded into a single node,
and the resulting graph — two cliques sharing one node — still has a cut vertex,
$$\kappa_v = 1$$, capping $$\lambda_2$$ at $$1$$ forever.

Strengthening a bottleneck edge helps only until the bottleneck stops being the
edge and becomes the pair of nodes it lands on.
In free energy terms: if your perturbation map is two clusters of ligands joined
by one transformation, running that one transformation ten times longer does not
fix the map. Adding a second, node-disjoint transformation does.

## four readings of the same number

So much for the algebra; now for why "connectivity" is the right word for what
came out of it. The following four statements are all direct readings of
"there exists a non-constant $$\mathbf x$$ with small $$\mathbf x^\mathsf T\mathbf L\mathbf x$$".

**Relaxation.** Let each node relax toward its neighbours,
$$\dot{\mathbf x} = -\mathbf L\mathbf x$$.
This is heat flow on the graph, and also the standard consensus/gossip protocol.
Expanding in eigenvectors, mode $$i$$ decays as $$e^{-\lambda_i t}$$.
The $$\lambda_1 = 0$$ mode is the conserved mean; everything else dies, and for
mean-zero initial data

$$ \|\mathbf x(t)\| \le e^{-\lambda_2 t}\,\|\mathbf x(0)\| $$

with the late-time decay rate equal to $$\lambda_2$$ exactly.
So $$\lambda_2$$ is the rate at which the graph equilibrates — the left panel of
the figure above, where the dashed lines are the bound and the eventual slope of
each curve is $$-\lambda_2$$. The barbell holds a difference between its two halves for a
long time, because a difference between the halves is precisely the slow mode.

**Vibration.** Make it second order instead,
$$\ddot{\mathbf x} = -\mathbf L\mathbf x$$: unit masses on nodes, springs of
stiffness $$w_{ab}$$ on edges. The normal frequencies are
$$\omega_i = \sqrt{\lambda_i}$$, the zero mode is rigid translation, and
$$\sqrt{\lambda_2}$$ is the lowest genuine vibration —
a dumbbell's slow twist about its thin waist.
An object with a narrow neck rings at a low frequency; so does a graph with a
sparse cut. Same statement, same mathematics.

**Mixing.** For a random walker, the relevant operator is the normalized
Laplacian $$\mathbf I - \mathbf D^{-1/2}\mathbf A\mathbf D^{-1/2}$$, whose second
eigenvalue is the **spectral gap**; mixing time scales as its inverse.
A bottleneck traps the walker on one side, and Cheeger's inequality is exactly
the statement that trapping and a small gap are the same phenomenon.

**Estimation.** This is the reading that sent me to the topic.
Suppose the graph is a measurement design: each edge reports a noisy difference
$$x_b - x_a$$ (a $$\Delta\Delta G$$ between two ligands, say),
and per-node values are recovered by weighted least squares.
As worked out in [cycle closure]({% post_url 2026-08-09-cycle-closure %}),
when the weights match the noise the covariance of the estimate is
$$\mathrm{Cov}(\hat{\mathbf x}) = \sigma^2\mathbf L^{+}$$.
For any contrast $$\mathbf u \perp \mathbf 1$$ with $$\|\mathbf u\| = 1$$,

$$
\mathrm{Var}(\mathbf u^\mathsf T\hat{\mathbf x}) = \sigma^2\,\mathbf u^\mathsf T\mathbf L^{+}\mathbf u
 \ \le\ \frac{\sigma^2}{\lambda_2}
$$

with equality when $$\mathbf u$$ is the Fiedler vector,
since $$\mathbf L^{+}$$ has eigenvalues $$1/\lambda_i$$ off the null space.
So $$1/\lambda_2$$ is the worst-case variance amplification of the entire design:
**$$\lambda_2$$ says how much the graph knows about its hardest question.**
On the barbell, $$\lambda_2 = 0.2984$$ gives $$3.35\,\sigma^2$$ for the worst
contrast — the relative offset of the two clusters.
Compare the unit-norm contrasts that ask about a single pair,
$$\mathbf u = (\mathbf e_a - \mathbf e_b)/\sqrt2$$:
$$0.2\,\sigma^2$$ for two ligands inside one clique,
$$0.5\,\sigma^2$$ for the two ends of the bridge.
No individual comparison looks bad;
the collective one is seven to seventeen times worse,
and $$\lambda_2$$ is what makes that visible.

## the Fiedler vector says where

$$\lambda_2$$ tells you how bad the worst split is.
The minimizer $$\mathbf v_2$$ tells you *where* it is: it labels each node with a
real number that varies as little as possible across edges,
so nodes that are hard to separate get similar labels.
Cutting at $$\mathrm{sign}(\mathbf v_2)$$, or at the best threshold along it,
is **spectral bisection**, and the proof of Cheeger's inequality is constructive —
sweeping the threshold is guaranteed to find a cut within the square-root bound.
This is the ancestor of spectral clustering.

For a measurement design, that is an actionable diagnostic:
$$\lambda_2$$ tells you whether your map has a weak spot,
$$\mathbf v_2$$ tells you which nodes sit on either side of it,
and the edges that straddle the sign change are the ones holding the map
together — the ones worth duplicating.

## caveats

- $$\lambda_2$$ carries the units of the weights.
  Scaling every weight by $$c$$ scales $$\lambda_2$$ by $$c$$.
  Comparing two graphs by $$\lambda_2$$ is meaningful only if their weights are
  comparable; otherwise normalize, e.g. divide by the mean degree, or use the
  normalized Laplacian, whose eigenvalues live in $$[0,2]$$.
- It is not scale-free in $$n$$ either — $$K_n$$ has $$\lambda_2 = n$$ —
  so for size-independent statements use $$\lambda_2/n$$, the ratio form above.
- Degree heterogeneity confuses the unnormalized version:
  the star has $$\lambda_2 = 1$$ whether it has ten leaves or a million.
- $$\lambda_2$$ is a worst-case, global statistic.
  A single bad cut sets it, and it says nothing about the rest of the graph.
  For per-node or per-edge diagnosis use effective resistances,
  the entries of $$\mathbf L^{+}$$, rather than one eigenvalue of $$\mathbf L$$.

## summary

- $$\mathbf x^\mathsf T\mathbf L\mathbf x = \sum_{(a,b)} w_{ab}(x_b - x_a)^2$$.
  The Laplacian is a machine for measuring disagreement between neighbours,
  and every property of $$\lambda_2$$ is a property of that sum of squares.
- $$\lambda_2$$ is the cheapest non-constant disagreement, and in gauge-free form
  it is $$n$$ times the worst-case ratio of edge disagreement to all-pairs
  disagreement — how well the graph imitates $$K_n$$.
- Every subset gives an upper bound
  $$\lambda_2 \le n\,\mathrm{cut}_w(S)/(\lvert S\rvert\lvert\bar S\rvert)$$;
  hence $$\lambda_2 \le \frac{n}{n-1}d_{\min}$$ and $$\lambda_2\le\kappa_v$$.
  Cheeger's inequality supplies the converse, so small $$\lambda_2$$ and a sparse
  balanced cut are the same thing.
- $$\lambda_2$$ is monotone under adding edges, zero iff disconnected,
  and reads dynamically as an equilibration rate, a lowest vibration frequency,
  a spectral gap, and a worst-case variance amplification $$1/\lambda_2$$.

## appendix: try it yourself

Everything above is a few lines of NumPy.
This builds the barbell, checks the quadratic form both ways,
verifies the cut bound by brute force over all subsets,
and measures the consensus decay rate:

```python
import itertools
import numpy as np

# two 5-cliques joined by a single edge
edges  = [(a, b, 1.0) for a, b in itertools.combinations(range(5), 2)]
edges += [(a, b, 1.0) for a, b in itertools.combinations(range(5, 10), 2)]
edges += [(3, 8, 1.0)]                        # the bridge
n = 10

L = np.zeros((n, n))                          # L = D - A
for a, b, w in edges:
    L[a, a] += w; L[b, b] += w
    L[a, b] -= w; L[b, a] -= w

ev, V = np.linalg.eigh(L)
lam2, v2 = ev[1], V[:, 1]
print("lambda2      ", round(lam2, 4))                 # 0.2984
print("fiedler signs", np.sign(v2).astype(int))        # one sign per clique

x = np.random.default_rng(0).normal(size=n)   # the quadratic form, both ways
print("x'Lx         ", round(x @ L @ x, 9),
      round(sum(w * (x[b] - x[a])**2 for a, b, w in edges), 9))

best = min(                                   # cut bound over every subset S
    n * sum(w for a, b, w in edges if (a in S) != (b in S)) / (len(S) * (n - len(S)))
    for r in range(1, n) for S in map(set, itertools.combinations(range(n), r)))
print("cut bound    ", round(best, 4), ">=", round(lam2, 4))

x0 = np.random.default_rng(1).normal(size=n)  # consensus decay, xdot = -L x
x0 -= x0.mean()
d = {}
for t in [1, 10, 30]:
    xt = V @ np.diag(np.exp(-ev * t)) @ V.T @ x0
    d[t] = np.linalg.norm(xt) / np.linalg.norm(x0)
    print(f"t={t:3d}  decay", round(d[t], 6), " bound", round(np.exp(-lam2 * t), 6))
print("late rate    ", round(np.log(d[10] / d[30]) / 20, 4))   # = lambda2
```

Two things to watch.
The brute-force cut bound lands on $$0.4$$, the balanced split of the barbell,
comfortably above $$\lambda_2 = 0.2984$$;
and the late-time decay rate comes back as $$0.2984$$ to four decimals,
which is the whole point — the eigenvalue is not a formal quantity but the
timescale on which the graph forgets a difference between its halves.
Raise the bridge weight and both numbers move together until the saturation at
$$1$$ sets in.
