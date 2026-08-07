---
layout: post
title: "Cycle closure: what it measures and what it cannot"
date:   2026-08-07 10:00:00 -0500
categories: [math and physics]
comments: true
tags: [linear algebra, statistics, free energy]
---

In relative binding free energy (RBFE) calculations,
we want the binding free energy $$\Delta G$$ of $$n$$ ligands,
but what we can compute efficiently is the free energy *difference*
$$\Delta\Delta G$$ between pairs of ligands.
The ligands and the simulated pairs form a graph:
ligands are nodes, and each measurement is an edge.

A classic sanity check on such data is **cycle closure**:
pick a closed loop of edges, say $$A\to B\to C\to A$$,
and add up the measured $$\Delta\Delta G$$'s with signs.
Since free energy is a state function, the exact values must sum to zero;
whatever is left over is error.
It feels like a free lunch — no experimental data is needed,
and any nonzero closure is a smoking gun.

In this post I want to work out precisely what cycle closure measures,
using nothing but linear algebra.
The punchline is that closure sees only part of the error,
and the part it cannot see is often the part you care about.

## the model

Stack the $$n$$ unknown per-ligand free energies into $$\mathbf x\in\mathbb R^n$$
and the $$m$$ measured edge values into $$\mathbf y\in\mathbb R^m$$.
An edge measuring the pair $$a\to b$$ ideally reports $$x_b - x_a$$, so

$$ \mathbf y = \mathbf B \mathbf x + \boldsymbol\epsilon $$

where $$\mathbf B$$ is the $$m\times n$$ signed **incidence matrix**:
the row for edge $$a\to b$$ has $$-1$$ in column $$a$$, $$+1$$ in column $$b$$, and zeros elsewhere.
This is a plain linear regression, except the design matrix is special:
every row is a difference of two node indicators,
$$\mathbf b_i = \mathbf e_b - \mathbf e_a$$.
In other words, $$\mathbf B$$ is the discrete gradient on the graph.

For the noise $$\boldsymbol\epsilon$$, I will assume as little as possible for now:

$$ \mathbb E[\boldsymbol\epsilon] = \mathbf 0,
\qquad
\mathrm{Cov}(\boldsymbol\epsilon) = \boldsymbol\Sigma \ \text{(unknown)} $$

Since $$\mathbf x$$ is a fixed unknown, the covariance of the data is simply

$$ \mathrm{Cov}(\mathbf y) = \boldsymbol\Sigma $$

Whether $$\boldsymbol\Sigma$$ is diagonal, and whether its diagonal is constant,
is exactly the question the two cases below will turn on.

## two structural facts, before any statistics

The incidence structure gives two facts for free, valid for any noise model.

**1. A global offset is unobservable.**
Every row of $$\mathbf B$$ sums to zero, so $$\mathbf B\mathbf 1 = \mathbf 0$$:
adding a constant to every ligand's free energy changes no edge difference.
For a connected graph this is the only degeneracy,
$$\mathrm{rank}(\mathbf B) = n-1$$,
and $$\mathbf x$$ is identifiable only up to an additive constant (a gauge freedom).
This is physically sensible — relative measurements can never fix an absolute scale.

**2. Cycles annihilate the signal.**
Let $$\mathbf z\in\mathbb R^m$$ be a cycle indicator:
$$\pm 1$$ on the edges of a closed loop (sign tracking direction), zero elsewhere.
Walking around the loop, each node is entered once and left once,
so the node contributions cancel:

$$ \mathbf z^\mathsf T \mathbf B = \mathbf 0 $$

The set of all such vectors (and their linear combinations) is the **cycle space**,
the orthogonal complement of $$\mathrm{col}(\mathbf B)$$,
with dimension $$m - n + 1$$ for a connected graph.
Applying $$\mathbf z$$ to the model,

$$ C(\mathbf z) \equiv \mathbf z^\mathsf T\mathbf y
 = \mathbf z^\mathsf T\mathbf B\mathbf x + \mathbf z^\mathsf T\boldsymbol\epsilon
 = \mathbf z^\mathsf T\boldsymbol\epsilon $$

The closure error is **pure noise**: the true free energies drop out identically.
This is both the charm and the curse of cycle closure.
The charm: closure needs no reference values, experimental or otherwise —
it is a property of the measurements alone.
The curse: it can only ever see the component of $$\boldsymbol\epsilon$$
that lives in the cycle space.
Hold that thought.

As a warm-up with numbers, a triangle with measurements
$$y_{AB}=0.30$$, $$y_{BC}=-0.31$$, $$y_{CA}=0.13$$ (kcal/mol)
has closure $$C = 0.30 - 0.31 + 0.13 = 0.12$$,
and no assignment of per-ligand values can absorb it.

## least squares and the covariance of the estimate

To turn $$m$$ edge measurements into $$n$$ ligand values, solve a least squares problem.
Allow a generic symmetric positive definite weight $$\mathbf W$$ for now:

$$ \hat{\mathbf x} = \arg\min_{\mathbf x}\;
(\mathbf y - \mathbf B\mathbf x)^\mathsf T \mathbf W (\mathbf y - \mathbf B\mathbf x) $$

The normal equations are $$\mathbf B^\mathsf T\mathbf W\mathbf B\, \hat{\mathbf x} = \mathbf B^\mathsf T\mathbf W\mathbf y$$. Define

$$ \mathbf L = \mathbf B^\mathsf T\mathbf W\mathbf B $$

For diagonal $$\mathbf W$$ this is the **weighted graph Laplacian** —
the same matrix that appears in circuit theory and spectral graph theory.
It is singular ($$\mathbf L\mathbf 1 = \mathbf 0$$, the gauge again),
so the solution uses the pseudo-inverse:

$$ \hat{\mathbf x} = \mathbf L^{+}\mathbf B^\mathsf T\mathbf W\,\mathbf y $$

The pseudo-inverse picks the minimum-norm solution, which is mean-centered —
a convention for the gauge, nothing more.
Taking expectations, $$\mathbb E[\hat{\mathbf x}] = \mathbf L^{+}\mathbf L\,\mathbf x$$,
which is $$\mathbf x$$ with its mean subtracted:
the estimate is unbiased up to the unobservable constant.

Now the covariance. Since $$\hat{\mathbf x}$$ is linear in $$\mathbf y$$,

$$ \mathrm{Cov}(\hat{\mathbf x})
 = \mathbf L^{+}\mathbf B^\mathsf T\mathbf W\,
   \boldsymbol\Sigma\,
   \mathbf W\mathbf B\,\mathbf L^{+} $$

This "sandwich" form is exact for **any** noise covariance $$\boldsymbol\Sigma$$
and **any** weight choice $$\mathbf W$$ — the two need not agree.
$$\mathbf W$$ is a modeling choice; $$\boldsymbol\Sigma$$ is a fact about the world.
Everything below is about what happens when we assume they are related.

It is also worth writing down the residual,
because closure statistics are built from it:

$$ \tilde{\boldsymbol\epsilon} = \mathbf y - \mathbf B\hat{\mathbf x}
 = (\mathbf I - \mathbf H)\,\mathbf y,
\qquad
\mathbf H = \mathbf B\mathbf L^{+}\mathbf B^\mathsf T\mathbf W $$

$$\mathbf H$$ is the hat matrix; $$\mathbf I - \mathbf H$$ projects onto the cycle space
(in the $$\mathbf W$$ inner product), and

$$ \mathrm{Cov}(\tilde{\boldsymbol\epsilon})
 = (\mathbf I - \mathbf H)\,\boldsymbol\Sigma\,(\mathbf I - \mathbf H)^\mathsf T $$

Since $$(\mathbf I-\mathbf H)\mathbf B = \mathbf 0$$,
the residual, like the closure sums, is blind to $$\mathbf x$$.

## case 1: ordinary least squares

The simplest assumption: all edges are equally noisy and independent,

$$ \boldsymbol\Sigma = \sigma^2\mathbf I, \qquad \mathbf W = \mathbf I $$

The sandwich collapses,
$$\mathbf L^{+}\mathbf B^\mathsf T \sigma^2\mathbf I\, \mathbf B \mathbf L^{+} = \sigma^2\mathbf L^{+}\mathbf L\mathbf L^{+}$$, giving

$$ \mathrm{Cov}(\hat{\mathbf x}) = \sigma^2\,\mathbf L^{+},
\qquad \mathbf L = \mathbf B^\mathsf T\mathbf B $$

the pseudo-inverse of the plain (unweighted) graph Laplacian.
The variance of a *difference* — the only gauge-invariant quantity — is

$$ \mathrm{Var}(\hat x_b - \hat x_a)
 = \sigma^2 (\mathbf e_b-\mathbf e_a)^\mathsf T \mathbf L^{+} (\mathbf e_b-\mathbf e_a)
 = \sigma^2 R_{\mathrm{eff}}(a,b) $$

where $$R_{\mathrm{eff}}$$ is the **effective resistance** between the two nodes
when every edge is a $$1\,\Omega$$ resistor.
This single identity carries all the design intuition:
edges in series add resistance (long chains of ligands accumulate variance),
edges in parallel reduce it (redundant paths average noise down),
and a **bridge** — an edge in no cycle — contributes its full resistance,
uncheckable by any closure.

The noise assumption also fixes the statistics of closure itself.
For a single loop of length $$\ell$$,

$$ C(\mathbf z) = \mathbf z^\mathsf T\boldsymbol\epsilon
\;\sim\; \mathcal N(0,\ \sigma^2 \ell) $$

so closure errors of honest independent noise grow as $$\sqrt{\ell}$$.
(This is a useful diagnostic in its own right: if observed closures are *flat*
in cycle length, the error is not diffuse noise but is concentrated
on a few bad edges — the loop sum is dominated by whichever bad edge it contains.)

And the residual gives an estimate of $$\sigma$$ for free.
With $$\mathrm{Cov}(\tilde{\boldsymbol\epsilon}) = \sigma^2(\mathbf I - \mathbf H)$$
and $$\mathrm{tr}(\mathbf I - \mathbf H) = m - n + 1$$,

$$ \mathbb E\left[\|\tilde{\boldsymbol\epsilon}\|^2\right] = \sigma^2\,(m-n+1) $$

The degrees of freedom is the dimension of the cycle space —
the number of independent loops.
A spanning tree has $$m = n-1$$: zero degrees of freedom, residual identically zero,
nothing to check.
Redundancy is what buys testability.

## case 2: weighted least squares

In practice edges are not equally noisy: each edge comes with its own
error bar $$\sigma_i$$ (from the BAR estimator, or from replicates).
The natural model and the natural weights are

$$ \boldsymbol\Sigma = \mathrm{diag}(\sigma_i^2),
\qquad \mathbf W = \boldsymbol\Sigma^{-1} $$

With $$\mathbf W\boldsymbol\Sigma\mathbf W = \mathbf W$$, the sandwich collapses again:

$$ \mathrm{Cov}(\hat{\mathbf x}) = \mathbf L^{+},
\qquad \mathbf L = \mathbf B^\mathsf T\boldsymbol\Sigma^{-1}\mathbf B $$

By Gauss–Markov this choice is optimal —
minimum variance among all linear unbiased estimators.
Any other $$\mathbf W$$ is legitimate (the sandwich still gives its honest covariance)
but wasteful.
This weighted fit is exactly what network analysis tools like DiffNet do
with an RBFE graph.

The electrical analogy now sharpens into an exact dictionary.
Give edge $$i$$ conductance $$w_i = 1/\sigma_i^2$$
and let its measurement act as an EMF $$y_i$$ in series with
internal resistance $$\sigma_i^2$$:

| statistics | circuit |
|---|---|
| fitted value $$\hat x_v$$ | voltage at node $$v$$ |
| normal equations $$\mathbf B^\mathsf T\mathbf W\tilde{\boldsymbol\epsilon} = \mathbf 0$$ | Kirchhoff's current law |
| residual $$\tilde\epsilon_i$$ | voltage across edge $$i$$'s internal resistance |
| $$w_i\tilde\epsilon_i$$ | current in edge $$i$$ |
| $$\mathrm{Var}(\hat x_b - \hat x_a)$$ | effective resistance $$R_{\mathrm{eff}}(a,b)$$ |
| $$\chi^2 = \tilde{\boldsymbol\epsilon}^\mathsf T\mathbf W\tilde{\boldsymbol\epsilon}$$ | total dissipated power |
| WLS | minimum-dissipation principle |

An inconsistent set of $$\Delta\Delta G$$'s is a loop with net EMF:
current circulates forever, burning power —
and the total power is the $$\chi^2$$ statistic.

Two consequences are worth calling out.

**Calibration.** If the error bars are correct,

$$ \chi^2 = \sum_i \frac{\tilde\epsilon_i^2}{\sigma_i^2}
\;\sim\; \chi^2_{m-n+1},
\qquad \mathbb E\!\left[\frac{\chi^2}{m-n+1}\right] = 1 $$

so $$\chi^2/\mathrm{dof}$$ tests the error bars themselves, with no external data.
A value of, say, 50 means the quoted per-edge uncertainties understate
the actual cycle-inconsistency by a factor of $$\sqrt{50}\approx 7$$ —
a common finding with BAR error bars, which capture within-run statistical noise
but not between-run scatter.

**Leverage.** The diagonal of the hat matrix,
$$h_i = w_i\, \mathbf b_i^\mathsf T\mathbf L^{+}\mathbf b_i = w_i R_{\mathrm{eff}}(i)$$,
satisfies $$\mathrm{Var}(\tilde\epsilon_i) = \sigma_i^2 (1 - h_i)$$.
An edge with a tight error bar is a low-resistance branch, so $$h_i\to 1$$:
the fit defers to it, and its residual is squeezed toward zero.
The most precisely measured edges are the least cross-checked —
and a bridge has $$h=1$$ exactly, with residual identically zero.
Small residual does not mean trustworthy edge;
it can equally mean untestable edge.

## what closure cannot see

Everything so far assumed $$\boldsymbol\Sigma$$ is diagonal —
edge errors independent of each other.
For RBFE data this is almost certainly false, and the failure mode is systematic:
if the force field misplaces one ligand's free energy,
**every edge touching that ligand is wrong together**.

Model this with a per-ligand bias $$\boldsymbol\delta\in\mathbb R^n$$:

$$ \boldsymbol\epsilon = \mathbf B\boldsymbol\delta + \boldsymbol\eta,
\qquad
\boldsymbol\Sigma = \tau^2\mathbf B\mathbf B^\mathsf T + \mathrm{diag}(\sigma_i^2) $$

where $$\boldsymbol\eta$$ is the honest per-edge noise
and $$\tau$$ sets the size of the ligand-level bias.
The bias term is cycle-consistent by construction — it *is* a difference of
node quantities — so it lies in $$\mathrm{col}(\mathbf B)$$, and every closure
quantity annihilates it:

$$ \mathbf z^\mathsf T(\mathbf B\boldsymbol\delta) = \mathbf 0,
\qquad
(\mathbf I - \mathbf H)\,\mathbf B\boldsymbol\delta = \mathbf 0 $$

Meanwhile the estimate swallows it whole:

$$ \hat{\mathbf x} - \mathbf x = \boldsymbol\delta
 + \mathbf L^{+}\mathbf B^\mathsf T\mathbf W\boldsymbol\eta $$

The bias passes through one-for-one, unattenuated,
while $$\chi^2$$, every loop sum, and every residual do not move at all.
One can corrupt the answer with 2 kcal/mol of per-ligand bias
and the closure diagnostics register nothing.
On real RBFE data this decomposition can be fitted directly
(regress the signed edge errors on $$\mathbf B$$);
on the BACE1 dataset I have been studying,
the cycle-consistent part accounts for roughly 85–90% of the error variance —
the majority of the error is exactly the kind closure cannot see.

Two corollaries close the loop, so to speak:

- **"$$\chi^2$$ looks fine" is not evidence the free energies are good.**
  It is evidence the *cycle-visible* noise matches the error bars — nothing more.
- **Adding redundant edges does not help with bias.**
  Extra cycles average down $$\boldsymbol\eta$$
  (that is the effective-resistance story),
  but $$\boldsymbol\delta$$ rides through any topology, any weighting,
  any pruning of edges.
  Against ligand-level bias, the only remedies are better physics
  or external reference data.

## summary

- Write the graph measurement problem as $$\mathbf y = \mathbf B\mathbf x + \boldsymbol\epsilon$$. Two subspaces of $$\mathbb R^m$$ do all the work: $$\mathrm{col}(\mathbf B)$$ (dimension $$n-1$$), where the signal lives, and the cycle space (dimension $$m-n+1$$), where closure lives.
- $$\mathrm{Cov}(\hat{\mathbf x})$$ is a sandwich $$\mathbf L^{+}\mathbf B^\mathsf T\mathbf W\boldsymbol\Sigma\mathbf W\mathbf B\mathbf L^{+}$$ in general; it collapses to $$\sigma^2\mathbf L^{+}$$ under OLS with iid noise and to $$\mathbf L^{+}$$ under WLS with $$\mathbf W=\boldsymbol\Sigma^{-1}$$, where variances of differences are effective resistances.
- Cycle closure and residuals are projections onto the cycle space. They see the cycle-inconsistent part of the error, calibrate error bars via $$\chi^2/(m-n+1)$$, and are exactly blind to any cycle-consistent error — in particular per-ligand bias, which is typically the dominant term.

Cycle closure is a test of *self-consistency*, not of *accuracy*.
It is well worth running — it is free, and it catches bad edges
and dishonest error bars.
Just do not read a clean closure as a clean calculation.
